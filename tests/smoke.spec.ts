import { test, expect } from '@playwright/test';

test.describe('Listora Micro-SaaS Smoke Tests (Google Stitch UI)', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure deterministic visitor quota of 3/3 for tests
    await page.route('**/api/visitor/status', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          visitor: {
            remaining: 3,
            current: 0,
            max: 3,
          },
        }),
      });
    });
  });

  test('1. Main landing page renders correctly with Ücretsiz Beta badge', async ({ page }) => {
    await page.goto('/');

    // Check main title & badge
    await expect(page).toHaveTitle(/Listora/);
    const betaBadge = page.locator('text=Ücretsiz Beta').first();
    await expect(betaBadge).toBeVisible();

    // Check header and core input fields
    await expect(page.locator('#product-title')).toBeVisible();
    await expect(page.locator('#product-category')).toBeVisible();
    await expect(page.locator('#product-features')).toBeVisible();

    // Check honest beta notice under the tool
    const honestNotice = page.locator('text=Ücretsiz beta: günlük kullanım sınırı vardır');
    await expect(honestNotice).toBeVisible();

    // Check section links
    await expect(page.locator('button:has-text("Nasıl çalışır")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Öncesi / Sonrası")').first()).toBeVisible();
    await expect(page.locator('button:has-text("SSS")').first()).toBeVisible();
  });

  test('2. Main generator flow produces structured output (mocked Gemini call)', async ({ page }) => {
    // Intercept POST /api/generate to mock the AI generation response reliably
    await page.route('**/api/generate', async (route) => {
      const mockResult = {
        success: true,
        data: {
          title: 'Trend Kadın Bej %100 Doğal Saf Keten Dökümlü Salaş Kısa Kollu Yazlık Gömlek',
          description:
            'Sıcak yaz günlerinde ferahlıktan ve zarafetten ödün vermek istemeyenler için özel olarak tasarlanan Listora Keten Gömlek, %100 doğal keten liflerinin benzersiz nefes alma özelliğiyle gün boyu maksimum konfor sunar.',
          highlights: [
            '%100 Doğal Keten Dokuma: Nefes alan yapısıyla terletmez',
            'Konforlu Salaş / Oversize Kesim: Rahat hareket alanı sağlar',
            'Zarif Sedef Düğme Detayı: Kaliteli dikiş işçiliği sunar',
            'Kolay Bakım & Dayanıklı Kumaş: Formunu uzun süre korur',
            'Çok Yönlü Kombin İmkânı: Jean ve şortlarla zahmetsiz şıklık',
          ],
          tags: ['keten gömlek', 'yazlık gömlek', 'oversize gömlek', 'saf keten', 'trend gömlek'],
        },
        usage: {
          remaining: 2,
          current: 1,
          max: 3,
        },
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResult),
      });
    });

    await page.goto('/');

    // Click preset sample
    const sampleButton = page.locator('button:has-text("Keten Gömlek")').first();
    await sampleButton.click();

    // Verify inputs populated
    await expect(page.locator('#product-title')).toHaveValue('Oversize Saf Keten Kısa Kollu Gömlek');

    // Click submit button "Üret"
    const submitBtn = page.locator('button[type="submit"]:has-text("Üret")');
    await submitBtn.click();

    // Verify output blocks render
    const titleBlock = page.locator('text=Trend Kadın Bej %100 Doğal Saf Keten Dökümlü Salaş Kısa Kollu Yazlık Gömlek');
    await expect(titleBlock).toBeVisible({ timeout: 10000 });

    // Verify highlights
    await expect(page.locator('text=%100 Doğal Keten Dokuma: Nefes alan yapısıyla terletmez')).toBeVisible();

    // Verify copy buttons exist
    const copyButtons = page.locator('button:has-text("Kopyala")');
    await expect(copyButtons.first()).toBeVisible();

    // Verify regenerate button exists
    const regenBtn = page.locator('button:has-text("Yeniden üret")');
    await expect(regenBtn).toBeVisible();
  });

  test('3. Per-visitor daily limit triggers friendly Pro Yakında limit panel', async ({ page }) => {
    // Intercept POST /api/generate with 429 VISITOR_LIMIT_REACHED
    await page.route('**/api/generate', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Bugünlük ücretsiz kullanım sınırınıza ulaştınız.',
          code: 'VISITOR_LIMIT_REACHED',
          limit: 3,
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
          message: 'Tebrikler! Listora Pro erken erişim listesine eklendiniz.',
        }),
      });
    });

    await page.goto('/');

    // Submit form
    await page.locator('button[type="submit"]:has-text("Üret")').click();

    // Verify limit panel appeared
    const limitHeading = page.locator('text=Bugünlük ücretsiz hakkın doldu');
    await expect(limitHeading).toBeVisible();

    // Fill email
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('satici@example.com');

    // Submit waitlist
    await page.locator('button[type="submit"]:has-text("Beni haberdar et")').click();

    // Verify confirmation
    await expect(page.locator('text=Harika! Listora Pro')).toBeVisible();
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

  test('5. Global daily cap displays friendly capacity full message', async ({ page }) => {
    // Intercept POST /api/generate with 429 GLOBAL_CAP_REACHED
    await page.route('**/api/generate', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Bugünlük kapasite doldu, yarın tekrar dene.',
          code: 'GLOBAL_CAP_REACHED',
        }),
      });
    });

    await page.goto('/');

    // Submit form
    await page.locator('button[type="submit"]:has-text("Üret")').click();

    // Verify friendly message appears
    await expect(page.locator('text=Bugünlük genel kapasite doldu, lütfen yarın tekrar deneyin.')).toBeVisible();
  });
});
