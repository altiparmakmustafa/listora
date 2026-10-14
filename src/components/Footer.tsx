'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  return (
    <footer className="bg-white border-t border-slate-200/90 pt-12 pb-10 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">Listora</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                Beta
              </span>
            </div>
            <p className="text-slate-500 max-w-sm text-xs leading-relaxed font-normal">
              Online satıcılar için satış getiren ürün açıklamaları, SEO başlıkları ve arama etiketleri üreten yapay zeka aracı.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => onScrollToSection('nasil-calisir')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Nasıl çalışır
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('karsilastirma')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Öncesi / Sonrası
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('sss')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Sıkça Sorulan Sorular
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Listora. Tüm hakları saklıdır. Türkiye & Global E-Ticaret için tasarlandı.
          </div>
          <div className="text-center sm:text-right">
            Trendyol, Hepsiburada, N11 ve Etsy bağımsız platformlardır; Listora bu platformlar için optimizasyon çözümü sunar.
          </div>
        </div>
      </div>
    </footer>
  );
};
