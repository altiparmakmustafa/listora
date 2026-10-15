# Listora ⚡

> Trendyol, Hepsiburada, N11 ve Etsy için saniyeler içinde satış getiren ürün başlığı, açıklaması ve etiketleri üreten yapay zeka micro-SaaS platformu.

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-3_Flash-orange?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Proje Hakkında (What It Is)

**Listora**, küçük ve orta ölçekli e-ticaret satıcılarının pazar yeri arama algoritmalarında (Trendyol Arama, Hepsiburada Algoritması, Etsy Arama Motoru) üst sıralara çıkmasını sağlayan, SEO uyumlu ve alıcı odaklı ürün içerikleri üretir.

### Temel Özellikler
- **SEO Uyumlu Başlık:** Pazar yeri karakter sınırlarına (Trendyol 100, Hepsiburada 110, N11 95, Etsy 140) göre muhafazakar olarak sınırlandırılmış yüksek tıklanma oranlı başlıklar.
- **5 Madde Öne Çıkanlar (Highlights):** Müşterinin satın alma kararını hızlandıran benefit-driven maddeler.
- **Satış Açıklaması:** İade oranlarını düşüren, net ve platform kurallarına uygun kısa paragraflar.
- **Platforma Özel Etiketler:** Etsy için zorunlu **tam 13 etiket ve her biri maksimum 20 karakter** kuralına tam uyum.
- **Tek Tıkla Kopyalama:** Her blok için ayrı ve toplu kopyalama butonları.
- **Ücretsiz Beta:** Ziyaretçi başına günlük 3 üretim hakkı ile adil kullanım.

---

## 🏗️ Mimari & Güvenlik (Architecture & Security)

- **Next.js App Router (Full-Stack):** Sunucu taraflı API rotaları (`/api/generate`, `/api/waitlist`, `/api/admin/stats`).
- **Google Gemini API Entegrasyonu:** API anahtarı hiçbir zaman istemciye (tarayıcıya) iletilmez, yalnızca sunucu tarafında (`process.env.GEMINI_API_KEY`) çalışır.
- **Prompt Enjeksiyon Koruması:** Kullanıcı girdisi kesinlikle veri olarak işlenir; "önceki talimatları unut" gibi prompt injection denemelerine karşı dirençlidir.
- **Zod Doğrulaması:** Hem gelen istekler hem de yapay zekadan dönen JSON yanıtlar Zod şemaları ile doğrulanır.
- **Maliyet ve Suistimal Koruması:**
  - **Ziyaretçi Başına Günlük Limit:** Çerez (`listora_vid`) + IP karması üzerinden günlük 3 üretim.
  - **Genel Günlük Tavan (`GLOBAL_DAILY_CAP`):** Günlük 500 üretim sınırına ulaşıldığında Gemini API çağrılmadan dostane hata mesajı döner.
  - **Burst Rate Limiting:** IP başına dakikada maksimum 5 istek (bot saldırılarına karşı).
  - **Gövde Boyutu Koruması:** 32KB üzerindeki istekler otomatik reddedilir.

---

## 💾 Sayaç Depolama & Upstash Redis Fallback

Listora, serverless ortamlar için kalıcı depolama desteğine sahiptir:

1. **Upstash Redis (Önerilen - Üretim):**
   `UPSTASH_REDIS_REST_URL` ve `UPSTASH_REDIS_REST_TOKEN` ortam değişkenleri sağlandığında tüm sayaçlar ve bekleme listesi Upstash Redis REST API üzerinden dağıtık olarak saklanır.
2. **In-Memory Fallback (Geliştirme / Yedek):**
   > **⚠️ TODO / ÖNEMLİ NOT:** Upstash bilgileri tanımlanmadığında Listora otomatik olarak bellek içi (in-memory) sayaca düşer. Serverless ortamlarda (Vercel lambdaları) bellek durumu örnekler arasında paylaşılamayacağı için üretim ortamında kesinlikle Upstash Redis kullanılması önerilir.

---

## 🔑 Ortam Değişkenleri (.env)

Projeyi çalıştırmak için `.env.example` dosyasını `.env.local` olarak kopyalayın:

| Değişken | Açıklama | Varsayılan |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google AI Studio API anahtarı (**Zorunlu**) | - |
| `GEMINI_MODEL` | Kullanılacak Gemini modeli | `gemini-flash-lite-latest` |
| `DAILY_LIMIT_PER_VISITOR` | Ziyaretçi başına günlük ücretsiz üretim hakkı | `3` |
| `GLOBAL_DAILY_CAP` | Platform genelindeki günlük maksimum üretim tavanı | `500` |
| `ADMIN_SECRET` | `/api/admin/stats` koruma parolası | Rastgele üretilen anahtar |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST bağlantı URL'i (İsteğe bağlı) | - |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST erişim token'ı (İsteğe bağlı) | - |

---

## 💰 Google Cloud / AI Studio Bütçe Uyarısı (Budget Alert) Kurulumu

Beklenmedik faturalandırmaları önlemek için Google Cloud Console üzerinden bütçe uyarısı ayarlamanız önerilir:

1. [Google Cloud Console Billing](https://console.cloud.google.com/billing) sayfasına gidin.
2. **Budgets & alerts (Bütçeler ve uyarılar)** menüsünü seçin.
3. **Create Budget (Bütçe Oluştur)** butonuna tıklayın.
4. Hedef API olarak **Generative Language API** seçin.
5. Aylık bütçeyi (örneğin 5$ veya 10$) belirleyin.
6. %50, %90 ve %100 eşiklerinde e-posta bildirimi tetikleyecek şekilde kaydedin.

---

## 🚀 Yerel Kurulum & Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
# Tarayıcıda http://localhost:3000 adresini açın

# Kod kalitesi denetimi
npm run lint

# TypeScript tip kontrolü
npm run type-check

# Playwright smoke testlerini çalıştırın
npm test

# Üretim derlemesi oluşturun
npm run build
```

---

## 📊 Yönetici Analitik Uç Noktası

Anonim metrikleri incelemek için (hiçbir kişisel veri içermez):

```bash
curl -H "Authorization: Bearer <ADMIN_SECRET>" https://listora.vercel.app/api/admin/stats
```

Dönüş Örneği:
```json
{
  "success": true,
  "data": {
    "today": "2026-10-14",
    "todayGenerations": 12,
    "globalDailyCap": 500,
    "totalLifetimeGenerations": 84,
    "platforms": { "trendyol": 45, "etsy": 28, "hepsiburada": 11 },
    "waitlistCount": 7,
    "storageType": "in_memory"
  }
}
```

---

## 📄 Lisans

MIT © 2026 Listora
