'use client';

import React, { useState } from 'react';
import { X, Crown, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().trim().email('Lütfen geçerli bir e-posta adresi yazınız');

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'limit_reached' | 'pro_clicked';
  dailyLimit?: number;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  reason = 'pro_clicked',
  dailyLimit = 15,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'Geçerli bir e-posta adresi giriniz');
      return;
    }

    try {
      setStatus('loading');
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: reason }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Kayıt alınırken bir hata oluştu');
      }

      setStatus('success');
      setSuccessMessage(data.message || 'Harika! Listora Pro bekleme listesine eklendiniz.');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Bir hata oluştu, lütfen tekrar deneyin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl shadow-indigo-500/10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Erken Erişim
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PRO YAKINDA
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">Listora Pro Bekleme Listesi</h3>
          </div>
        </div>

        {/* Reason banner if limit was reached */}
        {reason === 'limit_reached' && (
          <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2.5 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300">Günlük ücretsiz limitinize ulaştınız ({dailyLimit} üretim/gün).</p>
              <p className="text-amber-200/80 mt-0.5">
                Limitleriniz yarın sıfırlanacaktır. Sınırsız üretim ve toplu listeleme için Pro sürümüne ilk erişen siz olun!
              </p>
            </div>
          </div>
        )}

        {status === 'success' ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Teşekkür Ederiz!</h4>
              <p className="text-sm text-slate-300 mt-1 max-w-sm mx-auto">{successMessage}</p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Tamamdır, Teşekkürler
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              E-ticarette yüzlerce ürününüzü dakikalar içinde SEO uyumlu hale getirmek için geliştirilen Pro sürüme öncelikli erişim kazanın.
            </p>

            {/* Pro Features Checklist */}
            <div className="space-y-2.5 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-2.5 text-xs text-slate-200">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Günlük 250+ adet</strong> ürün başlığı ve açıklaması</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-200">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Toplu Excel & CSV</strong> formatında içe/dışa aktarma</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-200">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Trendyol & Hepsiburada API ile <strong>tek tıkla mağazaya yükleme</strong></span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-200">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Rakip pazar yeri başlık & etiket analizi</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="waitlist-email" className="block text-xs font-medium text-slate-400 mb-1">
                  E-posta Adresiniz
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adiniz@sirketiniz.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <span>Erken Erişim Listesine Katıl</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Spam göndermiyoruz. Sadece Pro sürüm ve beta güncellemeleri hakkında bilgilendirme alacaksınız.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
