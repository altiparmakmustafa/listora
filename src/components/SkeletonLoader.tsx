import React from 'react';
import { Sparkles } from 'lucide-react';

interface SkeletonLoaderProps {
  smallVariant?: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ smallVariant = false }) => {
  if (smallVariant) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-100" />
              <div className="h-4 w-36 bg-slate-200 rounded" />
            </div>
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-6 w-16 bg-slate-200 rounded-lg" />
            <div className="h-6 w-20 bg-slate-200 rounded-lg" />
            <div className="h-6 w-24 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-12 animate-pulse">
      {/* Top Meta Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-40 bg-indigo-100 rounded-full" />
            <div className="h-4 w-24 bg-slate-200 rounded" />
          </div>
          <div className="h-6 w-64 bg-slate-300 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 bg-slate-200 rounded-xl" />
          <div className="h-9 w-32 bg-indigo-200 rounded-xl" />
        </div>
      </div>

      {/* Generating status indicator banner */}
      <div className="mt-4 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center gap-2 text-indigo-700 text-xs font-semibold">
        <Sparkles className="w-4 h-4 animate-spin text-indigo-600" />
        <span>Listora SEO Yapay Zekası pazaryeri algoritmasına uygun başlık ve etiketleri üretiyor...</span>
      </div>

      {/* Cards Skeleton */}
      <div className="mt-6 space-y-6">
        {/* Card 1: Title Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-slate-200 rounded-full" />
              <div className="h-7 w-20 bg-slate-200 rounded-lg" />
            </div>
          </div>
          <div className="h-5 w-11/12 bg-slate-200 rounded" />
          <div className="h-4 w-7/12 bg-slate-100 rounded" />
        </div>

        {/* Card 2: Description Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50" />
              <div className="h-4 w-36 bg-slate-200 rounded" />
            </div>
            <div className="h-7 w-20 bg-slate-200 rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-4/5 bg-slate-200 rounded" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
          </div>
        </div>

        {/* Card 3: 5 Bullets Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50" />
              <div className="h-4 w-40 bg-slate-200 rounded" />
            </div>
            <div className="h-7 w-28 bg-slate-200 rounded-lg" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 shrink-0" />
                <div className={`h-4 bg-slate-200 rounded ${i % 2 === 0 ? 'w-5/6' : 'w-4/5'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Tags Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50" />
              <div className="h-4 w-36 bg-slate-200 rounded" />
            </div>
            <div className="h-7 w-32 bg-slate-200 rounded-lg" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[16, 20, 24, 18, 28, 20, 22, 14, 26, 18].map((w, idx) => (
              <div key={idx} className="h-7 bg-slate-200 rounded-lg" style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
