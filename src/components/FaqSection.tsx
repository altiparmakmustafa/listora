'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="sss" className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
          Sıkça Sorulan Sorular
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">
          Aklınıza takılan her şey
        </h2>
        <p className="text-sm text-slate-600 font-normal">
          Listora kullanımı, pazaryeri uyumluluğu ve ücretsiz beta hakkında merak edilenler.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-indigo-300 shadow-xs'
                  : 'bg-white/80 border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                  {item.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal animate-in fade-in duration-200">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
