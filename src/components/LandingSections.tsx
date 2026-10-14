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
      'Evet! Listora şu anda genel Beta aşamasındadır ve tüm e-ticaret satıcılarına ücretsizdir. Sunucu ve yapay zeka maliyetlerini adil dağıtmak ve suistimalleri önlemek amacıyla ziyaretçi başına günlük 15 üretim sınırı uygulanmaktadır.',
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
    <div className="space-y-24 mt-20 pt-16 border-t border-slate-800/80">
      {/* 1. Nasıl Çalışır? (How It Works) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
            Kolay ve Hızlı Süreç
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            3 Basit Adımda Satışlarınızı Artırın
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Dakikalarca ne yazacağınızı düşünmeyin. Algoritmaların aradığı formatta içerik üretin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ürün Bilgilerinizi Girin</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ürün adınızı ve en belirgin özelliklerini (materyal, boyut, kullanım amacı) kısaca listeleyin.
            </p>
          </div>

          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Platform ve Tonu Seçin</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trendyol, Hepsiburada, N11 veya Etsy seçeneklerinden birini ve hedef kitlenize hitap eden üslubu belirleyin.
            </p>
          </div>

          <div className="relative p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tek Tıkla Kopyalayın</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google Gemini destekli motorun saniyeler içinde ürettiği başlık, açıklama ve etiketleri mağazanıza aktarın.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Öncesi ve Sonrası (Before / After Comparison) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
            Dönüşüm Farkı
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sıradan Bir İlan vs. Listora ile Optimize Edilmiş İlan
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Aynı ürünün arama sıralamasında ve tıklanma oranında yarattığı farkı inceleyin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Klasik İlan (Before) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-900/40 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Klasik / Zayıf İlan (Düşük Sıralama)</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase block mb-1">Başlık:</span>
                <p className="text-sm font-semibold text-slate-300 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                  Deri Cüzdan Erkek Siyah Kartlık Kaliteli
                </p>
                <span className="text-[11px] text-rose-400 mt-1 block">
                  ❌ Anahtar kelime yığını, marka ve detay yok, arama filtresine takılır.
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase block mb-1">Açıklama:</span>
                <p className="text-xs text-slate-400 bg-slate-900/70 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  Ürünümüz hakiki deridir. Çok kullanışlıdır. Hemen kargolanır. İyi günlerde kullanın.
                </p>
                <span className="text-[11px] text-rose-400 mt-1 block">
                  ❌ Müşteri itirazlarını gidermez, RFID koruması, boyut veya kart kapasitesi belirtilmemiş.
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase block mb-1">Etiketler:</span>
                <p className="text-xs text-slate-400 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
                  cüzdan, deri, erkek
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-900/30 text-xs text-rose-300 font-medium">
              Sonuç: Düşük organik trafik, yüksek sepet terk oranı ve kararsız müşteri.
            </div>
          </div>

          {/* Listora Optimize İlan (After) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-900/50 relative flex flex-col justify-between shadow-xl shadow-emerald-950/30">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Listora ile Üretilen İlan (Yüksek Dönüşüm)</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase block mb-1">SEO Başlığı:</span>
                <p className="text-sm font-semibold text-emerald-100 bg-slate-900/90 p-3 rounded-xl border border-emerald-800/40">
                  El Yapımı Hakiki Dana Derisi RFID Korumalı Erkek Cüzdan ve Kartlık (8 Bölmeli)
                </p>
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  ✓ Algoritma uyumlu, tıklama artıran özellikler (RFID, Hakiki Deri, 8 Bölme) öne çıkarıldı.
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase block mb-1">5 Madde ve Satış Açıklaması:</span>
                <div className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-emerald-800/40 space-y-1.5 leading-relaxed">
                  <p>• <strong>%100 Hakiki Dana Derisi:</strong> Zamanla karakter kazanan esnek doku.</p>
                  <p>• <strong>RFID Güvenlik Kalkanı:</strong> Temassız kart kopyalamaya karşı tam koruma.</p>
                  <p>• <strong>Ultra İnce Tasarım:</strong> Pantolon veya ceket cebinde potluk yapmaz.</p>
                </div>
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  ✓ İade oranını düşürür, müşteri sorularını açıklamada önceden çözer.
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase block mb-1">Algoritmik Etiketler:</span>
                <p className="text-xs text-emerald-300 bg-slate-900/90 p-2.5 rounded-xl border border-emerald-800/40">
                  rfid cüzdan, hakiki deri kartlık, minimalist cüzdan, hediye erkek cüzdan, slim cüzdan
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-900/40 text-xs text-emerald-300 font-semibold flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Sonuç: Organik aramalarda üst sıra, yüksek güven ve artan sipariş dönüşümü.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pro CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-amber-950/40 border border-indigo-800/50 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block mb-3">
              YAKINDA SATIŞTA
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Yüzlerce Ürünü Olan Satıcılar İçin: Listora Pro
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Excel / CSV dosyanızı yükleyin; tüm mağazanızın başlık, açıklama ve etiketlerini tek tıkla toplu olarak güncelleyin.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenWaitlist}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/20 flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>Bekleme Listesine Katıl</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Sıkça Sorulan Sorular (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
            Merak Edilenler
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-white">Listora</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ücretsiz Beta
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                Trendyol, Hepsiburada, N11 ve Etsy satıcıları için saniyeler içinde satış getiren ürün başlığı, açıklaması ve etiketleri üreten yapay zeka platformu.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                Yasal & KVKK
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/gizlilik" className="hover:text-indigo-400 transition-colors">
                    Gizlilik Politikası & KVKK
                  </Link>
                </li>
                <li>
                  <Link href="/kullanim-kosullari" className="hover:text-indigo-400 transition-colors">
                    Kullanım Koşulları
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                Destek & Bilgi
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Geri bildirim veya Pro sürüm erken erişim için bekleme listemize katılabilirsiniz.
              </p>
              <button
                type="button"
                onClick={onOpenWaitlist}
                className="mt-2 text-xs text-amber-400 hover:text-amber-300 font-medium underline transition-colors cursor-pointer"
              >
                Pro Bekleme Listesi →
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
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
