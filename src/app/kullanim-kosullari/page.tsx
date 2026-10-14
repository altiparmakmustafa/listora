import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | Listora',
  description:
    'Listora kullanım koşulları, ücretsiz beta adil kullanım şartları ve yapay zeka içerik sorumluluk reddi.',
};

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Yasal Uyarı Kutusu */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/90 flex items-start space-x-3 text-amber-900 mb-8">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="block font-bold text-amber-950 uppercase tracking-wider mb-1">
              Yasal Uyarı (Taslak Metin)
            </strong>
            İşbu Kullanım Koşulları bir taslak olup, platformun ticari faaliyetleri öncesinde mutlaka
            uzman bir avukat / hukuk danışmanı tarafından incelenmeli ve onaylanmalıdır.
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <FileText className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Kullanım Koşulları
              </h1>
            </div>
            <p className="text-xs text-slate-400">Son Güncelleme: 14 Ekim 2026</p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Taraflar ve Kapsam</h2>
              <p>
                Bu Kullanım Koşulları, Listora platformuna erişen ve web sitesinde sunulan e-ticaret içerik üretimi araçlarını kullanan tüm kullanıcılar için bağlayıcıdır. Hizmeti kullanarak bu koşulları kabul etmiş sayılırsınız.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Ücretsiz Beta ve Adil Kullanım Politikası</h2>
              <p>
                Listora şu anda genel Beta aşamasındadır. Platform, sunucu ve yapay zeka API kaynaklarını dengeli paylaştırmak için ziyaretçi başına günlük 15 üretim hakkı tanır. Kota her gece 00:00&apos;da yenilenir. Ayrıca tüm platform için genel günlük kapasite tavanı uygulanabilir.
              </p>
              <p>
                Kullanıcılar; botlar, otomatik kazıma (scraping) araçları veya tersine mühendislik yöntemleriyle bu limitleri aşmaya çalışmayacağını taahhüt eder.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Yapay Zeka Çıktıları ve Satıcı Sorumluluğu</h2>
              <p>
                Listora, Google Gemini büyük dil modelleri ve pazar yeri algoritmalarına özel yönlendirmelerle içerik üretir. Üretilen tüm başlıklar, açıklamalar ve etiketler öneri niteliğindedir.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>
                  Satıcı; üretilen içeriği Trendyol, Hepsiburada, N11 veya Etsy mağazasına yüklemeden önce okumak, doğruluğunu teyit etmek ve mevzuata uygunluğunu denetlemekle münhasıran yükümlüdür.
                </li>
                <li>
                  Yapay zekanın ürettiği metinlerin pazar yeri politikalarını, marka tescillerini, fikri mülkiyet haklarını veya tüketici koruma kanunlarını ihlal etmesi durumunda doğabilecek zararlardan satıcının kendisi sorumludur.
                </li>
                <li>
                  Platform; herhangi bir ürünün satış rakamı, pazar yeri sıralaması veya kâr getireceği garantisini vermez.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Hizmet Değişiklikleri</h2>
              <p>
                Listora, Beta süreci boyunca veya sonrasında hizmet özelliklerini, kullanım limitlerini ve plan yapılarını önceden bildirmeksizin güncelleme veya durdurma hakkını saklı tutar.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
