import { z } from 'zod';

export const PlatformEnum = z.enum(['trendyol', 'hepsiburada', 'n11', 'etsy']);
export type PlatformType = z.infer<typeof PlatformEnum>;

export const ToneEnum = z.enum(['professional', 'friendly', 'persuasive', 'minimal']);
export type ToneType = z.infer<typeof ToneEnum>;

export const LanguageEnum = z.enum(['tr', 'en']);
export type LanguageType = z.infer<typeof LanguageEnum>;

/**
 * Incoming generation request payload validation schema
 */
export const GenerateRequestSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(2, { message: 'Ürün adı en az 2 karakter olmalıdır' })
    .max(120, { message: 'Ürün adı en fazla 120 karakter olabilir' }),
  category: z
    .string()
    .trim()
    .min(2, { message: 'Kategori en az 2 karakter olmalıdır' })
    .max(80, { message: 'Kategori en fazla 80 karakter olabilir' }),
  keyFeatures: z
    .string()
    .trim()
    .min(5, { message: 'Lütfen en az 1-2 temel özellik belirtin' })
    .max(1500, { message: 'Özellikler en fazla 1500 karakter olabilir' }),
  targetAudience: z
    .string()
    .trim()
    .max(100, { message: 'Hedef kitle en fazla 100 karakter olabilir' })
    .optional()
    .or(z.literal('')),
  tone: ToneEnum.default('professional'),
  platform: PlatformEnum.default('trendyol'),
  language: LanguageEnum.default('tr'),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

/**
 * Structured output response schema from Gemini
 */
export const GenerateResponseSchema = z.object({
  title: z.string().min(5).max(180),
  description: z.string().min(30).max(3000),
  highlights: z
    .array(z.string().min(5).max(250))
    .min(3)
    .max(7), // Target 5 bullet points
  tags: z.array(z.string().min(2).max(40)).min(3).max(20),
});

export type GenerateResponse = z.infer<typeof GenerateResponseSchema>;

/**
 * Waitlist email submission schema
 */
export const WaitlistRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Geçerli bir e-posta adresi giriniz' })
    .max(120, { message: 'E-posta adresi çok uzun' }),
  source: z.string().max(50).optional().default('limit_reached'),
});

export type WaitlistRequest = z.infer<typeof WaitlistRequestSchema>;
