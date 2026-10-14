'use client';

import React, { useState } from 'react';
import { Check, X, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';
import { BEFORE_AFTER_DATA } from '../data/mockData';

export const BeforeAfterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'before' | 'after'>('both');

  return (
    <section id="karsilastirma" className="py-14 bg-slate-100/60 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-indigo-600 bg-white border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
            Gerçek E-Ticaret Örneği
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-3">
            Öncesi ve Sonrası: Farkı Gözlerinizle Görün
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Aynı ürün, Listora ile dönüştürüldüğünde aramalarda nasıl tepeye çıkıyor ve neden 4 kat daha fazla satıyor?
          </p>

          {/* Mobile view switcher */}
          <div className="flex md:hidden items-center justify-center gap-1.5 mt-5">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1 text-xs font-medium rounded-lg cursor-pointer ${
                activeTab === 'both' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
              }`}
            >
              Yan Yana
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('before')}
              className={`px-3 py-1 text-xs font-medium rounded-lg cursor-pointer ${
                activeTab === 'before' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'
              }`}
            >
              Yalnızca Öncesi
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('after')}
              className={`px-3 py-1 text-xs font-medium rounded-lg cursor-pointer ${
                activeTab === 'after' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
              }`}
            >
              Yalnızca Sonrası
            </button>
          </div>
        </div>

        {/* Side by Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* BEFORE CARD */}
          {(activeTab === 'both' || activeTab === 'before') && (
            <div className="bg-white rounded-2xl border border-rose-200/80 shadow-xs p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-rose-50 text-rose-700 text-[11px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-rose-200">
                Öncesi: Düşük Dönüşüm
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Klasik Yetersiz İlan</h3>
                    <p className="text-xs text-slate-500">Aramalarda görünmez, güven vermez</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tıklama Oranı (CTR)</span>
                    <span className="font-bold text-slate-700">{BEFORE_AFTER_DATA.before.ctr}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Başlık Uzunluğu</span>
                    <span className="font-bold text-rose-600">{BEFORE_AFTER_DATA.before.charCount} karakter (Yetersiz)</span>
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Ürün Başlığı
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-800 border border-slate-200">
                    &ldquo;{BEFORE_AFTER_DATA.before.title}&rdquo;
                  </div>
                </div>

                {/* Bullets */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Özellik Maddeleri (Yetersiz)
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {BEFORE_AFTER_DATA.before.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-slate-300">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Description */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Açıklama
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {BEFORE_AFTER_DATA.before.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Trendyol algoritmasında geride kalır</span>
              </div>
            </div>
          )}

          {/* AFTER CARD */}
          {(activeTab === 'both' || activeTab === 'after') && (
            <div className="bg-white rounded-2xl border-2 border-indigo-500/80 shadow-md p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl shadow-xs">
                Sonrası: Listora AI İle Optimize Edildi
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Satış Getiren Zengin İlan</h3>
                    <p className="text-xs text-slate-500">Trendyol & Hepsiburada algoritma uyumlu</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Tıklama Oranı (CTR)</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      {BEFORE_AFTER_DATA.after.ctr}
                      <TrendingUp className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Başlık Uzunluğu</span>
                    <span className="font-bold text-indigo-700">{BEFORE_AFTER_DATA.after.charCount} / 100 karakter (İdeal)</span>
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
                    Ürün Başlığı (SEO Odaklı)
                  </span>
                  <div className="p-3 bg-indigo-50/50 rounded-xl text-xs font-semibold text-slate-900 border border-indigo-100">
                    &ldquo;{BEFORE_AFTER_DATA.after.title}&rdquo;
                  </div>
                </div>

                {/* Bullets */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
                    5 Satış Odaklı Madde
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {BEFORE_AFTER_DATA.after.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Description */}
                <div>
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
                    Açıklama (Dönüşüm Odaklı)
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {BEFORE_AFTER_DATA.after.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ortalama %300 daha fazla organik gösterim</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
