'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, ArrowRight, Sparkles, Mail, RefreshCw } from 'lucide-react';

interface LimitReachedPanelProps {
  onResetLimit?: () => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  dailyLimit?: number;
}

export const LimitReachedPanel: React.FC<LimitReachedPanelProps> = ({
  onResetLimit,
  onToast,
  dailyLimit = 15,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'limit_reached' }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSubmitted(true);
        onToast(data.message || 'Tebrikler! Listora Pro erken erişim listesine eklendiniz.', 'success');
      } else {
        onToast(data.error || 'Bekleme listesine eklenirken bir hata oluştu.', 'error');
      }
    } catch {
      onToast('Bağlantı hatası oluştu, lütfen tekrar deneyin.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-12 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-50 rounded-full blur-3xl pointer-events-none opacity-60" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-50 rounded-full blur-3xl pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-xl mx-auto">
          {/* Friendly Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Clock className="w-7 h-7" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Bugünlük ücretsiz hakkın doldu ({dailyLimit}/{dailyLimit})
          </h2>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-slate-600 mb-6 font-normal">
            Pro yakında! Haber almak için e-postanı bırak.
          </p>

          {/* Email Subscription Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresiniz"
                    className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-500/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Beni haberdar et</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-sm font-medium flex items-center justify-center gap-2 max-w-md mx-auto animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Harika! Listora Pro yayınlandığında %50 indirim kodunuzla birlikte e-posta alacaksınız.</span>
            </div>
          )}

          {/* Note that the limit resets tomorrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 text-xs font-medium text-slate-600 border border-slate-200/60 mb-8">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Ücretsiz hakların yarın (gece 00:00) otomatik olarak sıfırlanacaktır.</span>
          </div>

          {/* Pro Benefits Preview Box */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/70 p-5 text-left mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Listora Pro ile Gelecek Özellikler:
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Sınırsız günlük başlık ve açıklama üretimi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Excel / CSV ile 500+ ürünü tek tıkla toplu üretme</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Trendyol & Hepsiburada doğrudan API senkronizasyonu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>En çok aranan rakip anahtar kelime analizi</span>
              </div>
            </div>
          </div>

          {/* Test Reset Button for Reviewer */}
          {onResetLimit && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onResetLimit}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Test Önizlemesi: Günlük Hakları Yeniden Yükle</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
