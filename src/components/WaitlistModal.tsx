'use client';

import React, { useState } from 'react';
import { X, Crown, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Loader2, Clock } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Başlık (Ekran 3) */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Erken Erişim
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                PRO YAKINDA
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {reason === 'limit_reached'
                ? 'Bugünlük Ücretsiz Hakkın Doldu'
                : 'Listora Pro Bekleme Listesi'}
            </h3>
          </div>
        </div>

        {/* Limit dolumu durumunda bildirim ve gece 00:00 notu */}
        {reason === 'limit_reached' && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start space-x-2.5 text-xs text-amber-900">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">
                Günlük {dailyLimit} adetlik ücretsiz kullanım kotanıza ulaştınız.
              </p>
              <p className="text-amber-800 mt-0.5 leading-relaxed">
                Kota her gece <strong>00:00&apos;da otomatik olarak sıfırlanır</strong>. Sınırsız üretim ve toplu listeleme için Pro sürüme ilk erişenlerden olun.
              </p>
            </div>
          </div>
        )}

        {status === 'success' ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Teşekkür Ederiz!</h4>
              <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">{successMessage}</p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              Tamamdır, Teşekkürler
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              E-ticarette yüzlerce ürününüzü dakikalar içinde SEO uyumlu hale getirmek için geliştirilen Pro sürüme öncelikli erişim kazanın.
            </p>

            {/* Pro Özellikleri Listesi */}
            <div className="space-y-2.5 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-center space-x-2.5 text-xs text-slate-700">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span><strong>Günlük 250+ adet</strong> ürün başlığı ve açıklaması</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-700">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span><strong>Toplu Excel & CSV</strong> formatında içe/dışa aktarma</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-700">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Trendyol & Hepsiburada API ile <strong>tek tıkla mağazaya yükleme</strong></span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-700">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Rakip pazar yeri başlık & etiket analizi</span>
              </div>
            </div>

            {/* E-posta Formu */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="waitlist-email" className="block text-xs font-bold text-slate-700 mb-1">
                  E-posta Adresiniz
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adiniz@sirketiniz.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-2xs"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all cursor-pointer"
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

              <div className="pt-1 text-center space-y-1">
                <p className="text-[11px] text-slate-400">
                  Spam göndermiyoruz. Sadece Pro sürüm davetiyesi iletilecektir.
                </p>
                <p className="text-[11px] text-indigo-600 font-medium">
                  Gece 00:00&apos;da ücretsiz hakkınız tekrar 15/15 olarak yenilenecektir.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
