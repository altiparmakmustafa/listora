'use client';

import React from 'react';
import { Layers, CheckCircle2, Lock, Sparkles, Code2, RefreshCw } from 'lucide-react';
import { ActiveScreen } from '../types';

interface ScreenSwitcherProps {
  activeScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  quotaCount: number;
  maxQuota: number;
  onResetQuota: () => void;
  onOpenHandoff: () => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  activeScreen,
  onSelectScreen,
  quotaCount,
  maxQuota,
  onResetQuota,
  onOpenHandoff,
}) => {
  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-40 backdrop-blur">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-slate-100 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ekran Önizleyici:</span>
          </span>
          <span className="text-slate-400 hidden sm:inline">3 temel durum arasında hızlı geçiş yapın:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSelectScreen('landing')}
            className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeScreen === 'landing'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>1. Form & Ana Sayfa</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectScreen('results')}
            className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeScreen === 'results'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>2. Sonuçlar</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectScreen('limit')}
            className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeScreen === 'limit'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>3. Limit Doldu</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectScreen('skeleton')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              activeScreen === 'skeleton'
                ? 'bg-slate-700 text-white border border-slate-600'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
            title="Skeleton Yükleme Durumu Önizlemesi"
          >
            <Sparkles className="w-3 h-3 text-indigo-300" />
            <span>Skeleton</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={onOpenHandoff}
            className="px-2.5 py-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 border border-slate-700/60 cursor-pointer"
            title="Tasarım Handoff, Renk Paleti ve JSON/Kod Aktarımı"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium">Handoff & Kod</span>
          </button>

          <button
            type="button"
            onClick={onResetQuota}
            className="px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center gap-1 ml-1 cursor-pointer"
            title="Kullanım sayacını sıfırla"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden md:inline">Hak: {quotaCount}/{maxQuota}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
