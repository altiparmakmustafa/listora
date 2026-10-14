'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  Tag,
  ListOrdered,
  FileText,
  Type,
} from 'lucide-react';
import { GenerateResponse } from '@/lib/validations';
import { PLATFORMS } from '@/lib/config';

interface OutputViewProps {
  data: GenerateResponse;
  platform: string;
  onRegenerate: () => void;
  isLoading: boolean;
}

export const OutputView: React.FC<OutputViewProps> = ({
  data,
  platform,
  onRegenerate,
  isLoading,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const platformConfig = PLATFORMS[platform] || PLATFORMS.trendyol;
  const titleLength = data.title.length;
  const maxTitle = platformConfig.maxTitleLength;

  const copyToClipboard = async (text: string, sectionKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      setTimeout(() => {
        setCopiedSection(null);
      }, 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const copyAll = async () => {
    const fullText = `[BAŞLIK]\n${data.title}\n\n[ÖNE ÇIKANLAR]\n${data.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\n[AÇIKLAMA]\n${data.description}\n\n[ETİKETLER / ANAHTAR KELİMELER]\n${data.tags.join(', ')}`;
    await copyToClipboard(fullText, 'all');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top action bar: Platform badge & Regenerate button */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            {platformConfig.name} için Optimize Edildi
          </span>
          {platform === 'etsy' && (
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              13 Etiket & 20 Karakter Kuralı Uyumlu
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={copyAll}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            {copiedSection === 'all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Tümü Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Tümünü Kopyala</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onRegenerate}
            disabled={isLoading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Yeniden Üret</span>
          </button>
        </div>
      </div>

      {/* 1. Product Title Block */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 relative group transition-all hover:border-slate-700">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              SEO Ürün Başlığı
            </h4>
          </div>

          <div className="flex items-center space-x-3">
            {/* Character meter */}
            <span
              className={`text-xs font-mono font-medium ${
                titleLength <= maxTitle ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {titleLength} / {maxTitle} kar.
            </span>

            <button
              type="button"
              onClick={() => copyToClipboard(data.title, 'title')}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Başlığı Kopyala"
            >
              {copiedSection === 'title' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-base sm:text-lg font-medium text-white select-all leading-snug">
          {data.title}
        </p>
      </div>

      {/* 2. Highlights (5 Bullet Points) Block */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 relative group transition-all hover:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <ListOrdered className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Öne Çıkan Özellikler (5 Madde)
            </h4>
          </div>

          <button
            type="button"
            onClick={() =>
              copyToClipboard(
                data.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n'),
                'highlights'
              )
            }
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Maddeleri Kopyala"
          >
            {copiedSection === 'highlights' ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>

        <ul className="space-y-2.5">
          {data.highlights.map((point, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-sm text-slate-200">
              <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Product Description Block */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 relative group transition-all hover:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Ürün Açıklaması
            </h4>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(data.description, 'description')}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Açıklamayı Kopyala"
          >
            {copiedSection === 'description' ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>

        <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
          {data.description}
        </div>
      </div>

      {/* 4. Keywords / Tags Block */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 relative group transition-all hover:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Etiketler & Anahtar Kelimeler ({data.tags.length} adet)
            </h4>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(data.tags.join(', '), 'tags')}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Tüm Etiketleri Kopyala"
          >
            {copiedSection === 'tags' ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Tümünü Kopyala</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => copyToClipboard(tag, `tag-${idx}`)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-200 hover:text-white transition-all cursor-pointer group"
              title="Tıklayarak kopyala"
            >
              <span>{tag}</span>
              {copiedSection === `tag-${idx}` ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
