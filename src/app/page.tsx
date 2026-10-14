'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { GeneratorForm } from '@/components/GeneratorForm';
import { OutputView } from '@/components/OutputView';
import { WaitlistModal } from '@/components/WaitlistModal';
import { LandingSections } from '@/components/LandingSections';
import { GenerateRequest, GenerateResponse } from '@/lib/validations';
import { Sparkles, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [activePlatform, setActivePlatform] = useState<string>('trendyol');
  const [lastInput, setLastInput] = useState<GenerateRequest | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorBanner, setErrorBanner] = useState<{
    message: string;
    code?: string;
  } | null>(null);

  const [remainingGenerations, setRemainingGenerations] = useState<number | null>(null);
  const [maxGenerations, setMaxGenerations] = useState<number>(15);

  const [isWaitlistOpen, setIsWaitlistOpen] = useState<boolean>(false);
  const [waitlistReason, setWaitlistReason] = useState<'limit_reached' | 'pro_clicked'>('pro_clicked');

  // Load visitor usage on page mount
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/visitor/status');
        const data = await res.json();
        if (data?.visitor) {
          setRemainingGenerations(data.visitor.remaining);
          setMaxGenerations(data.visitor.max);
        }
      } catch (e) {
        console.error('Could not load visitor status', e);
      }
    }
    fetchStatus();
  }, []);

  const handleGenerate = async (formData: GenerateRequest) => {
    setIsLoading(true);
    setErrorBanner(null);
    setLastInput(formData);
    setActivePlatform(formData.platform);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        // Ziyaretçi günlük limiti doldu (Ekran 3)
        if (json.code === 'VISITOR_LIMIT_REACHED') {
          setRemainingGenerations(0);
          setWaitlistReason('limit_reached');
          setIsWaitlistOpen(true);
          setErrorBanner({
            message: 'Bugünlük ücretsiz kullanım hakkınız doldu (15/15). Pro sürüm için bekleme listesine katılabilirsiniz.',
            code: 'VISITOR_LIMIT_REACHED',
          });
          return;
        }

        // Genel günlük tavan doldu
        if (json.code === 'GLOBAL_CAP_REACHED') {
          setErrorBanner({
            message: 'Bugünlük kapasite doldu, yarın tekrar dene.',
            code: 'GLOBAL_CAP_REACHED',
          });
          return;
        }

        throw new Error(json.error || 'İçerik üretilirken bir hata oluştu');
      }

      setResult(json.data);
      if (json.usage) {
        setRemainingGenerations(json.usage.remaining);
        setMaxGenerations(json.usage.max);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Bağlantı hatası oluştu, lütfen tekrar deneyin';
      setErrorBanner({ message: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (lastInput) {
      await handleGenerate(lastInput);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col justify-between">
      {/* Navbar */}
      <Header
        remainingGenerations={remainingGenerations}
        maxGenerations={maxGenerations}
        onOpenWaitlist={() => {
          setWaitlistReason('pro_clicked');
          setIsWaitlistOpen(true);
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Hero Bölümü (Ekran 1) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Trendyol, Hepsiburada, N11 ve Etsy İçin E-Ticaret Yapay Zekası</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Saniyeler içinde <span className="text-indigo-600">satış getiren</span> ürün başlığı, açıklaması ve etiketleri üret.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pazar yeri algoritmalarının aradığı anahtar kelimeleri bulun, karakter sınırlarına takılmayın ve alıcıların satın alma kararını hızlandıran profesyonel listeler oluşturun.
          </p>
        </div>

        {/* Genel Hata & Limit Bildirimi */}
        {errorBanner && (
          <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">{errorBanner.message}</p>
              {errorBanner.code === 'VISITOR_LIMIT_REACHED' && (
                <button
                  type="button"
                  onClick={() => {
                    setWaitlistReason('limit_reached');
                    setIsWaitlistOpen(true);
                  }}
                  className="mt-1 text-xs text-indigo-700 underline font-bold hover:text-indigo-900 transition-colors cursor-pointer"
                >
                  Listora Pro bekleme listesine kaydolun →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Ana Araç Çalışma Alanı: Form ve Çıktı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sol Kolon: Form */}
          <div className={`lg:col-span-${result ? '6' : '12'} max-w-3xl mx-auto w-full transition-all`}>
            <GeneratorForm
              onSubmit={handleGenerate}
              isLoading={isLoading}
              onOpenWaitlist={() => {
                setWaitlistReason('pro_clicked');
                setIsWaitlistOpen(true);
              }}
            />
          </div>

          {/* Sağ Kolon: Üretilen Sonuçlar (Ekran 2: Results State) */}
          {result && (
            <div className="lg:col-span-6 w-full animate-fade-in">
              <OutputView
                data={result}
                platform={activePlatform}
                onRegenerate={handleRegenerate}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>

        {/* Landing Bilgilendirme Bölümleri */}
        <LandingSections
          onOpenWaitlist={() => {
            setWaitlistReason('pro_clicked');
            setIsWaitlistOpen(true);
          }}
        />
      </main>

      {/* Pro Bekleme Listesi Modalı (Ekran 3: Limit Reached) */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        reason={waitlistReason}
        dailyLimit={maxGenerations}
      />
    </div>
  );
}
