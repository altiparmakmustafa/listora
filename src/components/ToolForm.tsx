'use client';

import React from 'react';
import { Sparkles, Wand2, Check, RefreshCw } from 'lucide-react';
import { ProductFormData, ToneType, PlatformType } from '../types';
import { PLATFORM_CONFIG, PRESET_SAMPLES } from '../data/mockData';

interface ToolFormProps {
  formData: ProductFormData;
  onChange: (data: ProductFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onApplyPreset: (id: string) => void;
  activePresetId?: string;
}

const TONES: { id: ToneType; label: string }[] = [
  { id: 'Profesyonel', label: 'Profesyonel' },
  { id: 'Samimi', label: 'Samimi' },
  { id: 'İkna edici', label: 'İkna edici' },
  { id: 'Minimal', label: 'Minimal' },
];

const PLATFORMS: { id: PlatformType; label: string; badge: string }[] = [
  { id: 'Trendyol', label: 'Trendyol', badge: '100 Karakter' },
  { id: 'Hepsiburada', label: 'Hepsiburada', badge: '120 Karakter' },
  { id: 'N11', label: 'N11', badge: '100 Karakter' },
  { id: 'Etsy', label: 'Etsy', badge: '140 Karakter' },
];

export const ToolForm: React.FC<ToolFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  onApplyPreset,
  activePresetId,
}) => {
  const updateField = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    onChange({ ...formData, [key]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Quick sample presets bar */}
      <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-indigo-500" />
          <span>Hızlı Örnek Doldur:</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_SAMPLES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.id)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                activePresetId === preset.id
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-medium shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tool Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Row 1: Ürün Adı & Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Ürün Adı */}
            <div>
              <label
                htmlFor="product-title"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >
                Ürün adı <span className="text-rose-500">*</span>
              </label>
              <input
                id="product-title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Örn: Oversize Saf Keten Kısa Kollu Gömlek"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-500/15 transition-all"
              />
            </div>

            {/* Kategori */}
            <div>
              <label
                htmlFor="product-category"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >
                Kategori <span className="text-rose-500">*</span>
              </label>
              <input
                id="product-category"
                type="text"
                required
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="Örn: Kadın Giyim / Gömlek & Bluz"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-500/15 transition-all"
              />
            </div>
          </div>

          {/* Row 2: Öne çıkan özellikler (multiline textarea) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="product-features"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Öne çıkan özellikler <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400">Madde, kumaş, ebat veya teknik detaylar</span>
            </div>
            <textarea
              id="product-features"
              required
              rows={3}
              value={formData.features}
              onChange={(e) => updateField('features', e.target.value)}
              placeholder="Örn: %100 doğal nefes alabilen keten kumaş, terletmeyen hafif doku, sedef düğme detaylı, salaş dökümlü kalıp..."
              className="w-full px-3.5 py-2.5 bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-500/15 transition-all resize-y"
            />
          </div>

          {/* Row 3: Hedef kitle (optional text) */}
          <div>
            <label
              htmlFor="target-audience"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between"
            >
              <span>Hedef kitle <span className="text-slate-400 font-normal lowercase">(opsiyonel)</span></span>
              <span className="text-xs text-slate-400 font-normal">Kimin için tasarlandı?</span>
            </label>
            <input
              id="target-audience"
              type="text"
              value={formData.targetAudience}
              onChange={(e) => updateField('targetAudience', e.target.value)}
              placeholder="Örn: Yaz aylarında ve tatilde hem şık hem de konforlu giyinmeyi seven kadınlar"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-500/15 transition-all"
            />
          </div>

          {/* Row 4: Ton (Segmented Control) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Ton (Anlatım Dili)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
              {TONES.map((tone) => {
                const isSelected = formData.tone === tone.id;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => updateField('tone', tone.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-white text-indigo-700 font-semibold shadow-xs border border-slate-200/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <span>{tone.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 5: Platform (Selectable Chips) & Çıktı Dili (Toggle) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
            {/* Platform (Chips) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => {
                  const isSelected = formData.platform === platform.id;
                  const config = PLATFORM_CONFIG[platform.id];
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => updateField('platform', platform.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? `${config.badgeBg} border-indigo-500 ring-2 ring-indigo-500/15 shadow-xs font-semibold`
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{platform.label}</span>
                      <span className="text-[10px] opacity-75 font-normal">({platform.badge})</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Çıktı Dili (Toggle: Türkçe / English) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Çıktı Dili
              </label>
              <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => updateField('language', 'tr')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${
                    formData.language === 'tr'
                      ? 'bg-white text-indigo-700 font-semibold shadow-xs border border-slate-200/70'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Türkçe
                </button>
                <button
                  type="button"
                  onClick={() => updateField('language', 'en')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${
                    formData.language === 'en'
                      ? 'bg-white text-indigo-700 font-semibold shadow-xs border border-slate-200/70'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Action Row: Prominent Primary Button "Üret" */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-base shadow-sm shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Listeleme Hazırlanıyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Üret</span>
                </>
              )}
            </button>

            {/* Honest usage note */}
            <p className="text-center text-xs text-slate-500 mt-3 font-normal">
              Ücretsiz beta: günlük kullanım sınırı vardır.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
