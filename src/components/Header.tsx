'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Crown, Zap } from 'lucide-react';

interface HeaderProps {
  remainingGenerations: number | null;
  maxGenerations: number;
  onOpenWaitlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  remainingGenerations,
  maxGenerations,
  onOpenWaitlist,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Beta Rozeti */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Listora
            </span>
          </Link>

          {/* Ücretsiz Beta Rozeti (Emerald Vurgu) */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ücretsiz Beta
          </span>
        </div>

        {/* Sağ Taraf: Kota & Pro Butonu */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {remainingGenerations !== null && (
            <div
              className="hidden sm:flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700"
              title="Günlük kalan ücretsiz üretim hakkınız (Gece 00:00'da sıfırlanır)"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>
                Günlük Hak:{' '}
                <strong
                  className={
                    remainingGenerations > 0
                      ? 'text-indigo-600 font-bold'
                      : 'text-rose-600 font-bold'
                  }
                >
                  {remainingGenerations}/{maxGenerations}
                </strong>
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenWaitlist}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 transition-all cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pro Yakında</span>
          </button>
        </div>
      </div>
    </header>
  );
};
