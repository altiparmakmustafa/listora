'use client';

import React from 'react';
import { Sparkles, Zap, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  quotaCount: number;
  maxQuota: number;
  onScrollToSection: (id: string) => void;
  onQuickSample: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quotaCount,
  maxQuota,
  onScrollToSection,
  onQuickSample,
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Beta Badge */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Listora Ana Sayfa"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Listora
              </span>
            </div>
          </a>

          {/* Badge: Ücretsiz Beta */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
            Ücretsiz Beta
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
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
            SSS
          </button>
        </nav>

        {/* Right Action: Quota Indicator & Quick action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100/90 text-slate-700 border border-slate-200">
            <Zap className={`w-3.5 h-3.5 ${quotaCount > 0 ? 'text-amber-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Günlük Kalan:</span>
            <span className={`font-bold ${quotaCount === 0 ? 'text-rose-600' : 'text-indigo-600'}`}>
              {quotaCount} / {maxQuota}
            </span>
          </div>

          <button
            type="button"
            onClick={onQuickSample}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-indigo-200/80 transition-colors cursor-pointer"
            title="Örnek ürün verisiyle formu hızlıca doldurun"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Örnek Doldur</span>
          </button>
        </div>
      </div>
    </header>
  );
};
