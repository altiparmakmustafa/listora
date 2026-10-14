import React from 'react';
import { Sparkles, Check } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-10 pb-6 text-center max-w-4xl mx-auto px-4">
      {/* Top trust pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-medium mb-4 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        <span>E-Ticaret Pazaryerleri İçin Yapay Zeka Destekli SEO Motoru</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-4">
        Satış getiren ürün açıklamalarını <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
          saniyeler içinde üret
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
        Trendyol, Hepsiburada ve Etsy için başlık, açıklama ve etiketler.
      </p>

      {/* Feature trust bullets */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
          Pazaryeri SEO Kurallarına Tam Uyum
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
          5 Kat Hızlı Ürün Listeleme
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
          Kredi Kartı Gerektirmez
        </span>
      </div>
    </section>
  );
};
