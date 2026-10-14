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
    <div className="space-y-6">
      {/* Üst İşlem Çubuğu: Platform Rozeti & Yeniden Üret */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            {platformConfig.name} İçin Optimize Edildi
          </span>
          {platform === 'etsy' && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              13 Etiket & 20 Karakter Uyumlu
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={copyAll}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            {copiedSection === 'all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Tümü Kopyalandı</span>
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
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Yeniden Üret</span>
          </button>
        </div>
      </div>

      {/* 1. Kart: SEO Ürün Başlığı */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Type className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              SEO Ürün Başlığı
            </h4>
          </div>

          <div className="flex items-center space-x-3">
            {/* Karakter Göstergesi */}
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                titleLength <= maxTitle
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {titleLength} / {maxTitle} kar.
            </span>

            <button
              type="button"
              onClick={() => copyToClipboard(data.title, 'title')}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Başlığı Kopyala"
            >
              {copiedSection === 'title' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Kopyalandı</span>
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

        <p className="text-base sm:text-lg font-semibold text-slate-900 select-all leading-snug pt-1">
          {data.title}
        </p>
      </div>

      {/* 2. Kart: Öne Çıkan Özellikler (5 Madde) */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ListOrdered className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
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
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Maddeleri Kopyala"
          >
            {copiedSection === 'highlights' ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Kopyalandı</span>
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
            <li key={idx} className="flex items-start space-x-3 text-sm text-slate-800">
              <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Kart: Ürün Açıklaması */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Ürün Açıklaması
            </h4>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(data.description, 'description')}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Açıklamayı Kopyala"
          >
            {copiedSection === 'description' ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>

        <div className="text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
          {data.description}
        </div>
      </div>

      {/* 4. Kart: Etiketler & Anahtar Kelimeler */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Etiketler & Anahtar Kelimeler ({data.tags.length} adet)
            </h4>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(data.tags.join(', '), 'tags')}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Tüm Etiketleri Kopyala"
          >
            {copiedSection === 'tags' ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Kopyalandı</span>
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
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-medium transition-all cursor-pointer group"
              title="Tıklayarak kopyala"
            >
              <span>{tag}</span>
              {copiedSection === `tag-${idx}` ? (
                <Check className="w-3 h-3 text-emerald-600" />
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
