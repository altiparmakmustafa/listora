/**
 * Listora Configuration & Platform Constants
 * Centralized settings for usage limits, platform character ceilings, and plans.
 */

export interface PlatformConfig {
  id: 'trendyol' | 'hepsiburada' | 'n11' | 'etsy';
  name: string;
  maxTitleLength: number; // Conservative SEO title limit
  tagLimit?: number;
  maxTagLength?: number;
  badgeColor: string;
  description: string;
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  trendyol: {
    id: 'trendyol',
    name: 'Trendyol',
    maxTitleLength: 100, // Trendyol recommended SEO title length (conservative max 100)
    tagLimit: 10,
    maxTagLength: 30,
    badgeColor: 'from-orange-500 to-amber-600',
    description: 'Trendyol algoritması için marka, ürün tipi, renk ve beden optimizasyonu',
  },
  hepsiburada: {
    id: 'hepsiburada',
    name: 'Hepsiburada',
    maxTitleLength: 110, // Hepsiburada recommended title length
    tagLimit: 10,
    maxTagLength: 30,
    badgeColor: 'from-orange-600 to-red-600',
    description: 'Hepsiburada arama motoru ve kategori sıralaması uyumlu yapı',
  },
  n11: {
    id: 'n11',
    name: 'N11',
    maxTitleLength: 95, // N11 recommended title length
    tagLimit: 10,
    maxTagLength: 30,
    badgeColor: 'from-red-500 to-rose-700',
    description: 'N11 mağaza filtreleri ve kelime öbeği odaklı listeleme',
  },
  etsy: {
    id: 'etsy',
    name: 'Etsy',
    maxTitleLength: 140, // Etsy exact hard title limit is 140 characters
    tagLimit: 13, // Etsy allows exactly 13 tags
    maxTagLength: 20, // Etsy tag maximum is 20 characters per tag
    badgeColor: 'from-amber-600 to-orange-700',
    description: 'Etsy SEO için tam 13 etiket (max 20 kar.) ve global alıcı dili',
  },
};

export const TONES = [
  { id: 'professional', label: 'Profesyonel', desc: 'Kurumsal, güven veren ve teknik detay odaklı' },
  { id: 'friendly', label: 'Samimi', desc: 'Sıcak, kullanıcı dostu ve samimi bir hitap' },
  { id: 'persuasive', label: 'İkna Edici', desc: 'Dönüşüm ve satın alma tetikleyici güçlü dil' },
  { id: 'minimal', label: 'Minimalist', desc: 'Sade, net, gereksiz süslemelerden arındırılmış' },
] as const;

export const LANGUAGES = [
  { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
] as const;

/**
 * Usage limits & costs protection
 */
export const USAGE_CONFIG = {
  // Read from environment with conservative fallbacks
  dailyLimitPerVisitor: parseInt(process.env.DAILY_LIMIT_PER_VISITOR || '15', 10),
  globalDailyCap: parseInt(process.env.GLOBAL_DAILY_CAP || '500', 10),
  burstLimitPerMinute: 5, // Max 5 requests per minute per IP to prevent spam bots
  maxPayloadSizeBytes: 32 * 1024, // 32 KB payload limit
  cookieName: 'listora_vid',
  cookieMaxAgeSeconds: 60 * 60 * 24 * 365, // 1 year cookie
};

/**
 * Future Paid Tier / Plan Definitions (Modular structure for easy upgrades)
 */
export const PLANS = {
  free: {
    id: 'free',
    name: 'Ücretsiz Beta',
    dailyGenerations: USAGE_CONFIG.dailyLimitPerVisitor,
    exportFormats: ['copy'],
    support: 'community',
    priceTry: 0,
  },
  pro: {
    id: 'pro',
    name: 'Listora Pro (Yakında)',
    dailyGenerations: 250,
    exportFormats: ['copy', 'csv', 'excel'],
    support: 'priority',
    priceTry: 299,
    features: [
      'Günlük 250 adet yapay zeka ürün içeriği',
      'Toplu Excel / CSV formatında dışa aktarma',
      'Pazar yeri API entegrasyonu ile tek tıkla yükleme',
      'Rakip başlık & etiket analizi',
      'Öncelikli hızlı model işleme',
    ],
  },
};
