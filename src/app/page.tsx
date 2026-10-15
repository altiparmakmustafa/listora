'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ToolForm } from '@/components/ToolForm';
import { ResultsView } from '@/components/ResultsView';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { LimitReachedPanel } from '@/components/LimitReachedPanel';
import { HowItWorks } from '@/components/HowItWorks';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { HandoffModal } from '@/components/HandoffModal';
import { Toast } from '@/components/Toast';

import { ActiveScreen, ProductFormData, GeneratedResult } from '@/types';
import { PRESET_SAMPLES, INITIAL_RESULT, PLATFORM_CONFIG } from '@/data/mockData';

export default function Home() {
  // Screen management: 'landing' (form only) | 'results' | 'limit' | 'skeleton'
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('landing');

  // Daily quota: default 3 free generations per visitor
  const [maxQuota, setMaxQuota] = useState<number>(3);
  const [quotaCount, setQuotaCount] = useState<number>(3);

  // Form State initialized with the popular Linen Shirt example
  const [formData, setFormData] = useState<ProductFormData>(PRESET_SAMPLES[0].data);
  const [activePresetId, setActivePresetId] = useState<string>(PRESET_SAMPLES[0].id);

  // Result State
  const [result, setResult] = useState<GeneratedResult>(INITIAL_RESULT);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handoff & Code Export Modal
  const [isHandoffOpen, setIsHandoffOpen] = useState<boolean>(false);

  // Toast Notification state
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'info' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  // Fetch visitor usage status on mount
  useEffect(() => {
    async function loadVisitorStatus() {
      try {
        const res = await fetch('/api/visitor/status');
        if (res.ok) {
          const data = await res.json();
          if (data?.visitor) {
            setQuotaCount(data.visitor.remaining);
            setMaxQuota(data.visitor.max);
            if (data.visitor.remaining <= 0) {
              setActiveScreen('limit');
            }
          }
        }
      } catch (err) {
        console.error('Could not load visitor usage status:', err);
      }
    }
    loadVisitorStatus();
  }, []);

  // Preset Applicator
  const handleApplyPreset = (presetId: string) => {
    const found = PRESET_SAMPLES.find((p) => p.id === presetId);
    if (found) {
      setFormData(found.data);
      setActivePresetId(found.id);
      showToast(`"${found.label}" örnek verileri forma yüklendi.`);
    }
  };

  // Form Submit / Generation trigger
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (quotaCount <= 0) {
      setActiveScreen('limit');
      showToast('Günlük ücretsiz kullanım hakkınız doldu!', 'info');
      return;
    }

    setIsLoading(true);
    setActiveScreen('skeleton');

    try {
      const toneMapping: Record<string, string> = {
        'Profesyonel': 'professional',
        'Samimi': 'friendly',
        'İkna edici': 'persuasive',
        'Minimal': 'minimal',
      };
      const platformMapping: Record<string, string> = {
        'Trendyol': 'trendyol',
        'Hepsiburada': 'hepsiburada',
        'N11': 'n11',
        'Etsy': 'etsy',
      };

      const payload = {
        productName: formData.title,
        category: formData.category,
        keyFeatures: formData.features,
        targetAudience: formData.targetAudience,
        tone: toneMapping[formData.tone] || 'professional',
        platform: platformMapping[formData.platform] || 'trendyol',
        language: formData.language,
      };

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.code === 'VISITOR_LIMIT_REACHED') {
          setQuotaCount(0);
          setActiveScreen('limit');
          showToast('Bugünlük ücretsiz kullanım sınırınıza ulaştınız.', 'info');
          return;
        }

        if (json.code === 'GLOBAL_CAP_REACHED') {
          setActiveScreen('landing');
          showToast('Bugünlük genel kapasite doldu, lütfen yarın tekrar deneyin.', 'info');
          return;
        }

        throw new Error(json.error || 'İçerik üretilirken bir hata oluştu');
      }

      if (json.data) {
        const config = PLATFORM_CONFIG[formData.platform] || PLATFORM_CONFIG.Trendyol;
        const newResult: GeneratedResult = {
          title: json.data.title,
          titleCharLimit: config.titleLimit,
          description: json.data.description,
          bulletPoints: json.data.highlights || json.data.bulletPoints || [],
          tags: json.data.tags || [],
          platform: formData.platform,
          tone: formData.tone,
          language: formData.language,
          generatedAt: 'Az önce',
        };

        setResult(newResult);

        if (json.usage) {
          setQuotaCount(json.usage.remaining);
          setMaxQuota(json.usage.max);
        } else {
          setQuotaCount((prev) => Math.max(0, prev - 1));
        }

        setActiveScreen('results');
        showToast('Ürün listelemesi ve SEO etiketleri başarıyla üretildi!');

        // Smooth scroll to results
        setTimeout(() => {
          const el = document.getElementById('sonuclar');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Bir hata oluştu, lütfen tekrar deneyin.';
      setActiveScreen('landing');
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} panoya kopyalandı!`);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar
        quotaCount={quotaCount}
        maxQuota={maxQuota}
        onScrollToSection={handleScrollToSection}
        onQuickSample={() => handleApplyPreset(PRESET_SAMPLES[1].id)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Tool Form (Primary focus on Screen 1) */}
        <ToolForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleGenerate}
          isLoading={isLoading}
          onApplyPreset={handleApplyPreset}
          activePresetId={activePresetId}
        />

        {/* Screen 2: Results View (When activeScreen is 'results') */}
        {activeScreen === 'results' && (
          <ResultsView
            result={result}
            onRegenerate={() => handleGenerate()}
            onCopyText={handleCopyText}
            onOpenHandoff={() => setIsHandoffOpen(true)}
          />
        )}

        {/* Loading Skeleton State Preview (When activeScreen is 'skeleton') */}
        {activeScreen === 'skeleton' && (
          <div id="sonuclar">
            <SkeletonLoader />
          </div>
        )}

        {/* Screen 3: Limit Reached State (When activeScreen is 'limit') */}
        {activeScreen === 'limit' && (
          <div id="sonuclar">
            <LimitReachedPanel
              onToast={showToast}
              dailyLimit={maxQuota}
            />
          </div>
        )}

        {/* Landing informative sections */}
        <HowItWorks />
        <BeforeAfterSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Handoff & Code Export Modal */}
      <HandoffModal
        isOpen={isHandoffOpen}
        onClose={() => setIsHandoffOpen(false)}
        result={result}
        onToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
