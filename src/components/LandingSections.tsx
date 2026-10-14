'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  TrendingUp,
  XCircle,
  CheckCircle2,
} from 'lucide-react';

interface LandingSectionsProps {
  onOpenWaitlist: () => void;
}

const FAQS = [
  {
    question: 'Listora nedir ve pazar yeri satıcılarına nasıl yardımcı olur?',
    answer:
      'Listora; Trendyol, Hepsiburada, N11 ve Etsy algoritmalarına özel olarak eğitilmiş sistem talimatlarıyla çalışan bir yapay zeka içerik motorudur. Ürününüzün temel özelliklerini girdiğinizde, pazar yerinin arama motoru optimizasyonuna (SEO) ve alıcı psikolojisine uygun başlık, açıklama, 5 madde öne çıkan özellik ve etiket üretir.',
  },
  {
    question: 'Listora gerçekten tamamen ücretsiz mi?',
    answer:
      'Evet! Listora şu anda genel Beta aşamasındadır ve tüm e-ticaret satıcılarına ücretsizdir. Sunucu ve yapay zeka maliyetlerini adil dağıtmak ve suistimalleri önlemek amacıyla ziyaretçi başına günlük 15 üretim sınırı uygulanmaktadır. Bu kota her gece 00:00\'da otomatik olarak yenilenir.',
  },
  {
    question: 'Etsy 13 etiket kuralı ve karakter sınırlarına uyuyor mu?',
    answer:
      'Kesinlikle! Etsy platformunu seçtiğinizde Listora; Etsy algoritmasının zorunlu tuttuğu tam 13 adet etiket üretir ve her bir etiketin 20 karakteri aşmamasını otomatik olarak denetler.',
  },
  {
    question: 'Üretilen başlıklar pazar yerlerinin karakter sınırını aşar mı?',
    answer:
      'Hayır. Trendyol (maks. 100 karakter), Hepsiburada (maks. 110 karakter) ve N11 gibi platformların resmi arama tavsiyelerine göre muhafazakar sınırlar sisteme tanımlanmıştır. Başlığınız hiçbir zaman arama sonuçlarında kesilmeyecek şekilde üretilir.',
  },
  {
    question: 'Listora Pro ne zaman açılacak ve neler sunacak?',
    answer:
      'Pro sürüm çok yakında aktif hale gelecektir. Pro kullanıcıları günlük 250+ üretim hakkına sahip olacak, ürün listelerini toplu Excel/CSV formatında indirebilecek ve Trendyol/Hepsiburada mağazalarına API ile tek tıkla yükleyebilecektir.',
  },
];

export const LandingSections: React.FC<LandingSectionsProps> = ({ onOpenWaitlist }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-20 mt-20 pt-16 border-t border-slate-200">
      {/* 1. Nasıl Çalışır? (How It Works) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
            Kolay ve Hızlı Süreç
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            3 Basit Adımda Satışlarınızı Artırın
          </h2>
          <p className="mt-2.5 text-sm text-slate-600">
            Dakikalarca ne yazacağınızı düşünmeyin. Algoritmaların aradığı formatta içerik üretin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Ürün Bilgilerinizi Girin</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ürün adınızı ve en belirgin özelliklerini (materyal, boyut, kullanım amacı) kısaca listeleyin.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Platform ve Tonu Seçin</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trendyol, Hepsiburada, N11 veya Etsy seçeneklerinden birini ve hedef kitlenize hitap eden üslubu belirleyin.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Tek Tıkla Kopyalayın</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google Gemini destekli motorun saniyeler içinde ürettiği başlık, açıklama ve etiketleri mağazanıza aktarın.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Öncesi ve Sonrası (Before / After Comparison) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
            Dönüşüm Farkı
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sıradan Bir İlan vs. Listora ile Optimize Edilmiş İlan
          </h2>
          <p className="mt-2.5 text-sm text-slate-600">
            Aynı ürünün arama sıralamasında ve tıklanma oranında yarattığı farkı inceleyin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Klasik İlan (Before) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-rose-50/40 border border-rose-200/90 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Klasik / Zayıf İlan (Düşük Sıralama)</span>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">Başlık:</span>
                <p className="text-sm font-medium text-slate-800 bg-white p-3 rounded-xl border border-rose-100 shadow-2xs">
                  Deri Cüzdan Erkek Siyah Kartlık Kaliteli
                </p>
                <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                  ❌ Anahtar kelime yığını, marka ve detay yok, arama filtresine takılır.
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">Açıklama:</span>
                <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-rose-100 leading-relaxed shadow-2xs">
                  Ürünümüz hakiki deridir. Çok kullanışlıdır. Hemen kargolanır. İyi günlerde kullanın.
                </p>
                <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                  ❌ Müşteri itirazlarını gidermez, RFID koruması, boyut veya kart kapasitesi belirtilmemiş.
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">Etiketler:</span>
                <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                  cüzdan, deri, erkek
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs text-rose-800 font-semibold">
              Sonuç: Düşük organik trafik, yüksek sepet terk oranı ve kararsız alıcı.
            </div>
          </div>

          {/* Listora Optimize İlan (After) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/40 border border-emerald-200/90 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Listora ile Üretilen İlan (Yüksek Dönüşüm)</span>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">SEO Başlığı:</span>
                <p className="text-sm font-bold text-slate-900 bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs">
                  El Yapımı Hakiki Dana Derisi RFID Korumalı Erkek Cüzdan ve Kartlık (8 Bölmeli)
                </p>
                <span className="text-[11px] text-emerald-700 mt-1 block font-medium">
                  ✓ Algoritma uyumlu, tıklama artıran özellikler (RFID, Hakiki Deri, 8 Bölme) öne çıkarıldı.
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">5 Madde ve Satış Açıklaması:</span>
                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-emerald-100 space-y-1.5 leading-relaxed shadow-2xs">
                  <p>• <strong>%100 Hakiki Dana Derisi:</strong> Zamanla karakter kazanan esnek doku.</p>
                  <p>• <strong>RFID Güvenlik Kalkanı:</strong> Temassız kart kopyalamaya karşı tam koruma.</p>
                  <p>• <strong>Ultra İnce Tasarım:</strong> Pantolon veya ceket cebinde potluk yapmaz.</p>
                </div>
                <span className="text-[11px] text-emerald-700 mt-1 block font-medium">
                  ✓ İade oranını düşürür, müşteri sorularını açıklamada önceden çözer.
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">Algoritmik Etiketler:</span>
                <p className="text-xs text-emerald-800 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs font-medium">
                  rfid cüzdan, hakiki deri kartlık, minimalist cüzdan, hediye erkek cüzdan, slim cüzdan
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs text-emerald-800 font-bold flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Sonuç: Organik aramalarda üst sıra, yüksek güven ve artan sipariş dönüşümü.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pro CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/20 text-white inline-block mb-2.5">
              YAKINDA SATIŞTA
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Yüzlerce Ürünü Olan Satıcılar İçin: Listora Pro
            </h3>
            <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
              Excel / CSV dosyanızı yükleyin; tüm mağazanızın başlık, açıklama ve etiketlerini tek tıkla toplu olarak güncelleyin.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenWaitlist}
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-indigo-700 shadow-md flex items-center space-x-2 shrink-0 cursor-pointer transition-colors"
          >
            <span>Bekleme Listesine Katıl</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Sıkça Sorulan Sorular (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
            Merak Edilenler
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="border-t border-slate-200 bg-white pt-10 pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-slate-900">Listora</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  Ücretsiz Beta
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Trendyol, Hepsiburada, N11 ve Etsy satıcıları için saniyeler içinde satış getiren ürün başlığı, açıklaması ve etiketleri üreten yapay zeka platformu.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Yasal & KVKK
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/gizlilik" className="hover:text-indigo-600 transition-colors">
                    Gizlilik Politikası & KVKK
                  </Link>
                </li>
                <li>
                  <Link href="/kullanim-kosullari" className="hover:text-indigo-600 transition-colors">
                    Kullanım Koşulları
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Destek & Bilgi
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Geri bildirim veya Pro sürüm erken erişim için bekleme listemize katılabilirsiniz.
              </p>
              <button
                type="button"
                onClick={onOpenWaitlist}
                className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-semibold underline transition-colors cursor-pointer"
              >
                Pro Bekleme Listesi →
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© 2026 Listora. Tüm hakları saklıdır.</p>
            <p>
              KVKK uyarınca anonim kullanım sayaçları tutulur; kişisel veri olarak yalnızca onaylı bekleme listesi e-postaları saklanır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
