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
    <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
      {/* Hızlı Deneme Şablonları */}
      <div className="mb-6 pb-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Hızlı Deneme Şablonları:
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Tek tıkla formu doldurun
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset.data)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-all cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Platform Çipleri */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
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
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-bold ${
                        isSelected ? 'text-indigo-950' : 'text-slate-800'
                      }`}
                    >
                      {p.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block truncate">
                    Maks {p.maxTitleLength} kar.
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Ürün Adı & Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="productName"
                className="text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Ürün Adı
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                {formData.productName.length}/120
              </span>
            </div>
            <input
              id="productName"
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="Örn: Hakiki Deri Erkek Kartlık & Cüzdan"
              maxLength={120}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-2xs"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="category"
                className="text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Kategori
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                {formData.category.length}/80
              </span>
            </div>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Örn: Erkek Cüzdan & Aksesuar"
              maxLength={80}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-2xs"
              required
            />
          </div>
        </div>

        {/* 3. Öne Çıkan Özellikler */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="keyFeatures"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
            >
              <span>Öne Çıkan Özellikler</span>
              <span className="text-[11px] font-normal lowercase text-slate-400">
                (Her satıra bir özellik)
              </span>
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              {formData.keyFeatures.length}/1500
            </span>
          </div>
          <textarea
            id="keyFeatures"
            rows={4}
            value={formData.keyFeatures}
            onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
            placeholder="100% Hakiki dana derisi&#10;RFID korumalı 8 kart bölmesi&#10;Ultra ince cep dostu tasarım&#10;Hediye kutulu"
            maxLength={1500}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-sans leading-relaxed shadow-2xs"
            required
          />
        </div>

        {/* 4. Hedef Kitle (İsteğe Bağlı) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="targetAudience"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
            >
              <span>Hedef Kitle</span>
              <span className="text-[11px] font-normal lowercase text-slate-400">(İsteğe bağlı)</span>
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              {formData.targetAudience?.length || 0}/100
            </span>
          </div>
          <input
            id="targetAudience"
            type="text"
            value={formData.targetAudience || ''}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            placeholder="Örn: Çalışan genç profesyoneller, şık hediye arayanlar"
            maxLength={100}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-2xs"
          />
        </div>

        {/* 5. Ton Kontrolü & Çıktı Dili */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
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
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
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
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
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

        {/* Doğrulama Hatası */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* "Üret" Butonu (Primary Indigo-600 -> Indigo-700) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2.5 disabled:opacity-50 transition-all cursor-pointer hover:scale-[1.005] active:scale-[0.995]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Yapay Zeka İçeriği Oluşturuyor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Satış Getiren İçeriği Üret</span>
            </>
          )}
        </button>

        {/* Araç Altı Notu */}
        <div className="pt-1 text-center space-y-1">
          <p className="text-xs text-slate-500 leading-relaxed">
            Ücretsiz beta: günlük kullanım sınırı vardır.{' '}
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Pro yakında: Bekleme listesine katılın →
            </button>
          </p>
          <p className="text-[11px] text-slate-400">
            Günlük kullanım limitiniz her gece 00:00&apos;da otomatik olarak sıfırlanır.
          </p>
        </div>
      </form>
    </div>
  );
};
