import { test, expect } from '@playwright/test';

test.describe('Listora Micro-SaaS Smoke Tests', () => {
  test('1. Main landing page renders correctly with Ücretsiz Beta badge', async ({ page }) => {
    await page.goto('/');

    // Check main title & badge
    await expect(page).toHaveTitle(/Listora/);
    const betaBadge = page.locator('text=Ücretsiz Beta').first();
    await expect(betaBadge).toBeVisible();

    // Check header and core input fields
    await expect(page.locator('#productName')).toBeVisible();
    await expect(page.locator('#category')).toBeVisible();
    await expect(page.locator('#keyFeatures')).toBeVisible();

    // Check honest beta notice under the tool
    const honestNotice = page.locator('text=Ücretsiz beta: günlük kullanım sınırı vardır');
    await expect(honestNotice).toBeVisible();
  });

  test('2. Main generator flow produces structured output (mocked Gemini call)', async ({ page }) => {
    // Intercept POST /api/generate to mock the AI generation response reliably
    await page.route('**/api/generate', async (route) => {
      const mockResult = {
        success: true,
        data: {
          title: 'El Yapımı Hakiki Dana Derisi RFID Korumalı Erkek Cüzdan',
          description:
            'Birinci sınıf işçilikle üretilen hakiki deri erkek cüzdanı, şıklığı ve güvenliği bir araya getiriyor. RFID kalkanı sayesinde kartlarınız temassız kopyalamaya karşı tam koruma altındadır.',
          highlights: [
            '%100 hakiki dana derisi malzeme',
            'RFID koruma teknolojisi',
            '8 adet bağımsız kart bölmesi',
            'Kompakt ve cep dostu ultra ince tasarım',
            'Özel hediye kutulu teslimat',
          ],
          tags: ['deri cüzdan', 'erkek kartlık', 'rfid cüzdan', 'hediye cüzdan', 'slim kartlık'],
        },
        usage: {
          remaining: 14,
          current: 1,
          max: 15,
        },
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResult),
      });
    });

    await page.goto('/');

    // Click a sample preset to quickly populate form
    const sampleButton = page.locator('text=Hakiki Deri Cüzdan (Trendyol)');
    await sampleButton.click();

    // Verify inputs populated
    await expect(page.locator('#productName')).toHaveValue('El Yapımı Hakiki Deri Erkek Kartlık & Cüzdan');

    // Click submit button
    const submitBtn = page.locator('button[type="submit"]:has-text("Satış Getiren İçeriği Üret")');
    await submitBtn.click();

    // Verify output blocks render
    const titleBlock = page.locator('text=El Yapımı Hakiki Dana Derisi RFID Korumalı Erkek Cüzdan');
    await expect(titleBlock).toBeVisible({ timeout: 10000 });

    // Verify 5 highlights
    await expect(page.locator('text=%100 hakiki dana derisi malzeme')).toBeVisible();
    await expect(page.locator('text=Özel hediye kutulu teslimat')).toBeVisible();

    // Verify copy buttons exist
    const copyButtons = page.locator('button:has-text("Kopyala")');
    await expect(copyButtons.first()).toBeVisible();

    // Verify regenerate button exists
    const regenBtn = page.locator('button:has-text("Yeniden Üret")');
    await expect(regenBtn).toBeVisible();
  });

  test('3. Per-visitor daily limit triggers friendly Pro Yakında waitlist modal', async ({ page }) => {
    // Intercept POST /api/generate with 429 VISITOR_LIMIT_REACHED
    await page.route('**/api/generate', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Bugünlük ücretsiz kullanım sınırınıza ulaştınız.',
          code: 'VISITOR_LIMIT_REACHED',
          limit: 15,
        }),
      });
    });

    // Mock waitlist API
    await page.route('**/api/waitlist', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          isNew: true,
          message: 'Harika! Listora Pro bekleme listesine eklendiniz.',
        }),
      });
    });

    await page.goto('/');

    // Click preset and submit
    await page.locator('text=Hakiki Deri Cüzdan (Trendyol)').click();
    await page.locator('button[type="submit"]:has-text("Satış Getiren İçeriği Üret")').click();

    // Verify waitlist modal opened
    const modalHeading = page.getByRole('heading', { name: 'Listora Pro Bekleme Listesi' });
    await expect(modalHeading).toBeVisible();

    // Fill email
    const emailInput = page.locator('#waitlist-email');
    await emailInput.fill('satici@example.com');

    // Submit waitlist
    await page.locator('button:has-text("Erken Erişim Listesine Katıl")').click();

    // Verify confirmation
    await expect(page.locator('text=Teşekkür Ederiz!')).toBeVisible();
  });

  test('4. Legal pages render with lawyer review disclaimer', async ({ page }) => {
    // Gizlilik page
    await page.goto('/gizlilik');
    await expect(page.getByRole('heading', { name: 'Gizlilik Politikası ve KVKK Aydınlatma Metni' })).toBeVisible();
    await expect(page.locator('text=Yasal Uyarı (Taslak Metin)')).toBeVisible();

    // Kullanim koşulları page
    await page.goto('/kullanim-kosullari');
    await expect(page.getByRole('heading', { name: 'Kullanım Koşulları' })).toBeVisible();
    await expect(page.locator('text=Yasal Uyarı (Taslak Metin)')).toBeVisible();
  });
});
