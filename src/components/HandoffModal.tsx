'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Code2, Palette, Box, FileJson } from 'lucide-react';
import { GeneratedResult } from '../types';

interface HandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: GeneratedResult;
  onToast: (msg: string) => void;
}

const DESIGN_TOKENS = {
  theme: 'Light Theme with Clean Trustworthy SaaS aesthetics',
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    headings: 'font-extrabold / font-bold tracking-tight',
    body: 'text-sm / text-base leading-relaxed font-normal'
  },
  colorPalette: {
    primary: '#4f46e5 (Indigo 600 - Main Brand & CTAs)',
    primaryHover: '#4338ca (Indigo 700)',
    primaryLight: '#eef2ff (Indigo 50)',
    background: '#f8fafc (Slate 50 - Very light gray)',
    cardSurface: '#ffffff (White)',
    cardBorder: '#e2e8f0 (Slate 200)',
    successAccent: '#10b981 (Emerald 500) / #ecfdf5 (Emerald 50)',
    warningLimit: '#d97706 (Amber 600) / #fffbeb (Amber 50)',
    textPrimary: '#0f172a (Slate 900)',
    textMuted: '#64748b (Slate 500)'
  },
  geometry: {
    cardRadius: 'rounded-2xl (16px) or rounded-xl (12px)',
    buttonRadius: 'rounded-xl (12px)',
    inputRadius: 'rounded-xl (12px)',
    shadows: 'shadow-xs, shadow-sm, shadow-indigo-200'
  }
};

const COMPONENT_SPECS = [
  {
    name: 'Navbar',
    rules: 'Sticky top, h-16, bg-white/90 backdrop-blur, border-b border-slate-200, beta badge + quota indicator.'
  },
  {
    name: 'Main Tool Card',
    rules: 'max-w-4xl, bg-white rounded-2xl, border-slate-200, p-6 to p-8, generous spacing (gap-5, space-y-6).'
  },
  {
    name: 'Inputs & Textareas',
    rules: 'bg-slate-50/60, rounded-xl, border-slate-200, focus:border-indigo-600 focus:ring-3 focus:ring-indigo-500/15.'
  },
  {
    name: 'Segmented Control',
    rules: 'p-1 bg-slate-100 rounded-xl, active item bg-white shadow-xs text-indigo-700 font-semibold.'
  },
  {
    name: 'Platform Chips',
    rules: 'inline-flex items-center gap-1.5, px-3.5 py-2, rounded-xl, active state uses platform color tint + checkmark.'
  },
  {
    name: 'Primary Button',
    rules: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3.5 shadow-sm shadow-indigo-200.'
  },
  {
    name: 'Result Cards (4x)',
    rules: 'Distinct cards for Başlık, Açıklama, 5 Bullets, Etiketler. Individual copy buttons + character counter.'
  }
];

export const HandoffModal: React.FC<HandoffModalProps> = ({
  isOpen,
  onClose,
  result,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'json' | 'markdown' | 'tokens' | 'components'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonExport = JSON.stringify(
    {
      platform: result.platform,
      marketplace_rules: {
        title_max_chars: result.titleCharLimit,
        target_audience: 'E-commerce verified',
        tone: result.tone,
        language: result.language
      },
      listing: {
        title: result.title,
        title_length: result.title.length,
        description: result.description,
        bullet_points: result.bulletPoints,
        tags: result.tags,
        tag_count: result.tags.length
      },
      meta: {
        generator: 'Listora AI v1.0 Beta',
        generated_at: new Date().toISOString()
      }
    },
    null,
    2
  );

  const markdownExport = `# ${result.title}

**Platform:** ${result.platform} | **Ton:** ${result.tone} | **Dil:** ${result.language.toUpperCase()}

---

### Öne Çıkan Özellikler
${result.bulletPoints.map((b) => `- ${b}`).join('\n')}

---

### Ürün Açıklaması
${result.description}

---

### Arama Etiketleri
${result.tags.map((t) => `#${t}`).join(' ')}
`;

  const handleCopyCurrent = () => {
    const textToCopy =
      activeTab === 'json'
        ? jsonExport
        : activeTab === 'markdown'
        ? markdownExport
        : activeTab === 'tokens'
        ? JSON.stringify(DESIGN_TOKENS, null, 2)
        : JSON.stringify(COMPONENT_SPECS, null, 2);

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onToast('Pano içeriği başarıyla kopyalandı');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Geliştirici Handoff & Kod Dışa Aktarımı
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Tasarım sistemleri, token&apos;lar ve pazaryeri veri şeması
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>JSON İlan Verisi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('markdown')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'markdown'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Markdown</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tokens')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tokens'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Tasarım Token&apos;ları</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'components'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Bileşen Şartnamesi</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyCurrent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
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

        {/* Content Viewer */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900 text-slate-100 font-mono text-xs">
          {activeTab === 'json' && (
            <pre className="whitespace-pre-wrap leading-relaxed text-emerald-400">
              {jsonExport}
            </pre>
          )}

          {activeTab === 'markdown' && (
            <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
              {markdownExport}
            </pre>
          )}

          {activeTab === 'tokens' && (
            <pre className="whitespace-pre-wrap leading-relaxed text-cyan-300">
              {JSON.stringify(DESIGN_TOKENS, null, 2)}
            </pre>
          )}

          {activeTab === 'components' && (
            <div className="space-y-4 font-sans text-xs">
              {COMPONENT_SPECS.map((comp, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="font-bold text-indigo-400 mb-1">{comp.name}</div>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                    {comp.rules}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Tüm pazaryeri API entegrasyonlarına uygun temiz şema</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
