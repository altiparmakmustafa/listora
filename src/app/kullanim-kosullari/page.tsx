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
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Lawyer Review Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-amber-200 mb-8">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="block font-bold text-amber-300 uppercase tracking-wider mb-1">
              Yasal Uyarı (Taslak Metin)
            </strong>
            İşbu Kullanım Koşulları bir taslak olup, platformun ticari faaliyetleri öncesinde mutlaka
            uzman bir avukat / hukuk danışmanı tarafından incelenmeli ve onaylanmalıdır.
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-12 space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Kullanım Koşulları
              </h1>
            </div>
            <p className="text-xs text-slate-400">Son Güncelleme: 14 Ekim 2026</p>
          </div>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Taraflar ve Kapsam</h2>
              <p>
                Bu Kullanım Koşulları, Listora platformuna erişen ve web sitesinde sunulan e-ticaret içerik üretimi araçlarını kullanan tüm kullanıcılar için bağlayıcıdır. Hizmeti kullanarak bu koşulları kabul etmiş sayılırsınız.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Ücretsiz Beta ve Adil Kullanım Politikası</h2>
              <p>
                Listora şu anda genel Beta aşamasındadır. Platform, sunucu ve yapay zeka API kaynaklarını dengeli paylaştırmak için ziyaretçi başına günlük 15 üretim hakkı tanır. Ayrıca tüm platform için genel günlük kapasite tavanı uygulanabilir.
              </p>
              <p>
                Kullanıcılar; botlar, otomatik kazıma (scraping) araçları veya tersine mühendislik yöntemleriyle bu limitleri aşmaya çalışmayacağını taahhüt eder.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Yapay Zeka Çıktıları ve Satıcı Sorumluluğu</h2>
              <p>
                Listora, Google Gemini büyük dil modelleri ve pazar yeri algoritmalarına özel yönlendirmelerle içerik üretir. Üretilen tüm başlıklar, açıklamalar ve etiketler öneri niteliğindedir.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
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
              <h2 className="text-lg font-bold text-white">4. Hizmet Değişiklikleri</h2>
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
