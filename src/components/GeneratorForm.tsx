'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  Flame,
} from 'lucide-react';
import { GenerateRequest } from '@/lib/validations';
import { PLATFORMS, TONES, LANGUAGES } from '@/lib/config';

interface GeneratorFormProps {
  onSubmit: (data: GenerateRequest) => Promise<void>;
  isLoading: boolean;
  onOpenWaitlist: () => void;
}

const SAMPLE_PRESETS: Array<{
  label: string;
  data: GenerateRequest;
}> = [
  {
    label: 'Hakiki Deri Cüzdan (Trendyol)',
    data: {
      productName: 'El Yapımı Hakiki Deri Erkek Kartlık & Cüzdan',
      category: 'Erkek Cüzdan & Kartlık',
      keyFeatures:
        '100% dana derisi\nRFID kart kopyalama koruma teknolojisi\n8 adet bağımsız kart bölmesi ve para gözü\nUltra ince ve hafif tasarım\nÖzel hediye kutulu gönderim',
      targetAudience: 'Minimalist erkekler, şık hediye arayanlar',
      tone: 'professional',
      platform: 'trendyol',
      language: 'tr',
    },
  },
  {
    label: 'El Yapımı Seramik Kupa (Etsy)',
    data: {
      productName: 'Handmade Ceramic Coffee Mug with Boho Glaze',
      category: 'Home & Living / Drinkware / Mugs',
      keyFeatures:
        '100% hand-thrown on pottery wheel\nFood-safe, lead-free reactive glaze\nMicrowave and dishwasher safe\nCapacity: 350ml / 12oz\nEach piece has unique organic earth tones',
      targetAudience: 'Coffee lovers, artisan pottery collectors',
      tone: 'friendly',
      platform: 'etsy',
      language: 'en',
    },
  },
  {
    label: 'Kablosuz Kulaklık (Hepsiburada)',
    data: {
      productName: 'Pro ANC Aktif Gürültü Engelleyici Bluetooth Kulaklık',
      category: 'Elektronik / Ses Sistemleri / Kulaklıklar',
      keyFeatures:
        '35 dB Hibrit Aktif Gürültü Engelleme (ANC)\n40 saat toplam pil ömrü ve hızlı şarj (10 dk şarj ile 3 saat)\nBluetooth 5.3 ultra düşük gecikme oyun modu\nIPX5 ter ve su sıçramalarına dayanıklı\n4 mikrofonlu yapay zeka destekli net telefon görüşmesi',
      targetAudience: 'Öğrenciler, ofis çalışanları ve spor yapanlar',
      tone: 'persuasive',
      platform: 'hepsiburada',
      language: 'tr',
    },
  },
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  onSubmit,
  isLoading,
  onOpenWaitlist,
}) => {
  const [formData, setFormData] = useState<GenerateRequest>({
    productName: '',
    category: '',
    keyFeatures: '',
    targetAudience: '',
    tone: 'professional',
    platform: 'trendyol',
    language: 'tr',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleApplyPreset = (preset: GenerateRequest) => {
    setFormData(preset);
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.productName.trim() || formData.productName.length < 2) {
      setValidationError('Lütfen geçerli bir ürün adı giriniz (en az 2 karakter)');
      return;
    }
    if (!formData.category.trim() || formData.category.length < 2) {
      setValidationError('Lütfen ürün kategorisini belirtiniz');
      return;
    }
    if (!formData.keyFeatures.trim() || formData.keyFeatures.length < 5) {
      setValidationError('Lütfen ürününüzün en az 1-2 temel özelliğini yazınız');
      return;
    }

    await onSubmit(formData);
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
      {/* Quick sample chips */}
      <div className="mb-6 pb-5 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Hızlı Deneme Şablonları:
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Tek tıkla formu doldurun
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset.data)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Platform Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Hedef Satış Platformu
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(PLATFORMS).map((p) => {
              const isSelected = formData.platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, platform: p.id })}
                  className={`relative p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/10'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-bold ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {p.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">
                    Maks {p.maxTitleLength} kar.
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Product Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="productName"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Ürün Adı
              </label>
              <span className="text-[11px] text-slate-500">{formData.productName.length}/120</span>
            </div>
            <input
              id="productName"
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="Örn: Hakiki Deri Erkek Kartlık & Cüzdan"
              maxLength={120}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="category"
                className="text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Kategori
              </label>
              <span className="text-[11px] text-slate-500">{formData.category.length}/80</span>
            </div>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Örn: Erkek Cüzdan & Aksesuar"
              maxLength={80}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* 3. Key Features */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="keyFeatures"
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
            >
              <span>Temel Özellikler</span>
              <span className="text-[11px] font-normal lowercase text-slate-500">
                (Her satıra bir özellik)
              </span>
            </label>
            <span className="text-[11px] text-slate-500">{formData.keyFeatures.length}/1500</span>
          </div>
          <textarea
            id="keyFeatures"
            rows={4}
            value={formData.keyFeatures}
            onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
            placeholder="100% Hakiki dana derisi&#10;RFID korumalı 8 kart bölmesi&#10;Ultra ince cep dostu tasarım&#10;Hediye kutulu"
            maxLength={1500}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-sans leading-relaxed"
            required
          />
        </div>

        {/* 4. Target Audience (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="targetAudience"
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
            >
              <span>Hedef Kitle</span>
              <span className="text-[11px] font-normal lowercase text-slate-500">(İsteğe bağlı)</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {formData.targetAudience?.length || 0}/100
            </span>
          </div>
          <input
            id="targetAudience"
            type="text"
            value={formData.targetAudience || ''}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            placeholder="Örn: Çalışan genç profesyoneller, minimalist hediye arayanlar"
            maxLength={100}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* 5. Tone & Output Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              İçerik Tonu
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TONES.map((t) => {
                const isSelected = formData.tone === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, tone: t.id })}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Çıktı Dili
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => {
                const isSelected = formData.language === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, language: lang.id })}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2.5 disabled:opacity-50 transition-all cursor-pointer hover:scale-[1.01]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Yapay Zeka İçeriği Oluşturuyor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Satış Getiren İçeriği Üret</span>
            </>
          )}
        </button>

        {/* Honest Beta Note & Pro Waitlist Link */}
        <div className="pt-2 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            Ücretsiz beta: günlük kullanım sınırı vardır.{' '}
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Pro yakında: Bekleme listesine katılın →
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
