'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Tag,
  ListChecks,
  FileText,
  Heading,
  Code2,
  Edit3,
  Info
} from 'lucide-react';
import { GeneratedResult } from '../types';
import { PLATFORM_CONFIG } from '../data/mockData';

interface ResultsViewProps {
  result: GeneratedResult;
  onRegenerate: () => void;
  onCopyText: (text: string, label: string) => void;
  onOpenHandoff: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onRegenerate,
  onCopyText,
  onOpenHandoff,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [prevResult, setPrevResult] = useState(result);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(result.title);
  const [descValue, setDescValue] = useState(result.description);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  // Sync state if result changes without an effect
  if (prevResult !== result) {
    setPrevResult(result);
    setTitleValue(result.title);
    setDescValue(result.description);
  }

  const platformInfo = PLATFORM_CONFIG[result.platform] || PLATFORM_CONFIG.Trendyol;
  const currentTitleLength = titleValue.length;
  const isOverLimit = currentTitleLength > platformInfo.titleLimit;
  const isNearLimit = currentTitleLength >= platformInfo.titleLimit * 0.85 && !isOverLimit;

  const handleCopy = (text: string, sectionId: string, label: string) => {
    onCopyText(text, label);
    setCopiedSection(sectionId);
    setTimeout(() => {
      setCopiedSection((prev) => (prev === sectionId ? null : prev));
    }, 2000);
  };

  const handleCopyAll = () => {
    const fullText = `[BAŞLIK]\n${titleValue}\n\n[ÖNE ÇIKAN ÖZELLİKLER]\n${result.bulletPoints.map((b) => `• ${b}`).join('\n')}\n\n[ÜRÜN AÇIKLAMASI]\n${descValue}\n\n[ETİKETLER]\n${result.tags.join(', ')}`;
    handleCopy(fullText, 'all', 'Tüm Ürün Paketi');
  };

  return (
    <div id="sonuclar" className="w-full max-w-4xl mx-auto px-4 pt-8 pb-12 animate-in fade-in duration-300">
      {/* Top Bar of Results: Platform info, meta, actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${platformInfo.badgeBg}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{result.platform} İçin Optimize Edildi</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Ton: <strong className="text-slate-700">{result.tone}</strong>
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Dil: <strong className="text-slate-700">{result.language === 'tr' ? 'Türkçe' : 'İngilizce'}</strong>
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Üretilen Ürün Açıklaması & SEO Paketi
          </h2>
        </div>

        {/* Action Buttons: Yeniden Üret, Tümünü Kopyala, Handoff */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Yeniden üret</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-all cursor-pointer"
          >
            {copiedSection === 'all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>Tümü Kopyalandı!</span>
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
            onClick={onOpenHandoff}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
            title="Geliştirici Handoff ve JSON Çıktısı"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 Result Cards */}
      <div className="mt-6 space-y-6">
        {/* Card 1: Başlık (Title) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all hover:border-slate-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Heading className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Başlık (Ürün Başlığı)
              </h3>
            </div>

            {/* Character Counter & Copy */}
            <div className="flex items-center gap-3">
              {/* Character Counter */}
              <div
                className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 border ${
                  isOverLimit
                    ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                    : isNearLimit
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <span>
                  {currentTitleLength} / {platformInfo.titleLimit} karakter
                </span>
                {isNearLimit && <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-normal">İdeal</span>}
              </div>

              {/* Edit Toggle */}
              <button
                type="button"
                onClick={() => setIsEditingTitle(!isEditingTitle)}
                className="text-xs text-slate-500 hover:text-indigo-600 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                title="Başlığı düzenle"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              {/* Kopyala Button */}
              <button
                type="button"
                onClick={() => handleCopy(titleValue, 'title', 'Başlık')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  copiedSection === 'title'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800'
                }`}
              >
                {copiedSection === 'title' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Title Content */}
          {isEditingTitle ? (
            <div className="space-y-2">
              <input
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                className="w-full px-3 py-2 text-base font-medium text-slate-900 border border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <p className="text-[11px] text-slate-400">Başlığı doğrudan düzenleyip kopyalayabilirsiniz.</p>
            </div>
          ) : (
            <p className="text-base font-semibold text-slate-900 leading-snug">
              {titleValue}
            </p>
          )}

          {/* Tip */}
          <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>{platformInfo.tips}</span>
          </div>
        </div>

        {/* Card 2: Açıklama (Description) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all hover:border-slate-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Açıklama (Ürün Metni)
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                {descValue.split(/\s+/).filter(Boolean).length} kelime
              </span>

              {/* Edit Toggle */}
              <button
                type="button"
                onClick={() => setIsEditingDesc(!isEditingDesc)}
                className="text-xs text-slate-500 hover:text-indigo-600 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                title="Açıklamayı düzenle"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              {/* Kopyala Button */}
              <button
                type="button"
                onClick={() => handleCopy(descValue, 'desc', 'Açıklama')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  copiedSection === 'desc'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800'
                }`}
              >
                {copiedSection === 'desc' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {isEditingDesc ? (
            <textarea
              rows={6}
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
              className="w-full px-3 py-2 text-sm text-slate-800 border border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          ) : (
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-normal">
              {descValue.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {/* Card 3: Öne çıkan özellikler (5 bullets) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all hover:border-slate-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ListChecks className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Öne çıkan özellikler
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {result.bulletPoints.length} Madde
              </span>

              {/* Kopyala Button */}
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    result.bulletPoints.map((b) => `• ${b}`).join('\n'),
                    'bullets',
                    'Özellik Maddeleri'
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  copiedSection === 'bullets'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800'
                }`}
              >
                {copiedSection === 'bullets' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Maddeleri Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <ul className="space-y-2.5">
            {result.bulletPoints.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-slate-700 group hover:bg-slate-50/80 p-2 rounded-xl transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="flex-1 leading-snug">{bullet}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(bullet, `bullet-${idx}`, `Madde ${idx + 1}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 p-1 rounded cursor-pointer"
                  title="Tek bu maddeyi kopyala"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 4: Etiketler (Tag chips) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all hover:border-slate-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Etiketler & Arama Kelimeleri
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                {result.tags.length} etiket ({platformInfo.recommendedTagCount})
              </span>

              {/* Kopyala Button */}
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    result.tags.join(', '),
                    'tags',
                    'Etiketler'
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  copiedSection === 'tags'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800'
                }`}
              >
                {copiedSection === 'tags' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Tüm Etiketleri Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCopy(tag, `tag-${idx}`, `#${tag}`)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/80 hover:border-indigo-200 transition-all cursor-pointer"
                title="Kopyalamak için tıklayın"
              >
                <span>#{tag}</span>
                <Copy className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 opacity-60 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 mt-3">
            Pazaryeri paneline virgülle ayrılmış olarak yapıştırmak için &ldquo;Tüm Etiketleri Kopyala&rdquo; butonunu kullanabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};
