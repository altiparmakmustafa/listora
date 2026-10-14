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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Beta Tag */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              Listora
            </span>
          </Link>

          {/* Ücretsiz Beta Tag */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ücretsiz Beta
          </span>
        </div>

        {/* Right Actions: Usage Counter & Pro Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {remainingGenerations !== null && (
            <div
              className="hidden sm:flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              title="Günlük kalan ücretsiz üretim hakkınız"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Günlük Hak:{' '}
                <strong className={remainingGenerations > 0 ? 'text-indigo-400 font-semibold' : 'text-rose-400 font-semibold'}>
                  {remainingGenerations}/{maxGenerations}
                </strong>
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenWaitlist}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-600/10 text-amber-300 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/25 transition-all shadow-sm"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Pro Yakında</span>
          </button>
        </div>
      </div>
    </header>
  );
};
