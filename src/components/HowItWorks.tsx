import React from 'react';
import { PenLine, SlidersHorizontal, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Ürün Bilgilerini Gir',
      description: 'Ürün adı, kumaş, materyal veya temel teknik özelliklerini birkaç kelimeyle formumuza ekle.',
      icon: PenLine,
      badge: '10 Saniye'
    },
    {
      step: '02',
      title: 'Pazaryeri ve Tonunu Seç',
      description: 'Trendyol, Hepsiburada, N11 veya Etsy kurallarına göre algoritma optimizasyonunu belirle.',
      icon: SlidersHorizontal,
      badge: 'Kişiselleştirilmiş'
    },
    {
      step: '03',
      title: 'Kopyala & Satışa Başla',
      description: 'SEO puanı yüksek başlık, akıcı açıklama, 5 madde ve etiketleri tek tıkla mağazana yapıştır.',
      icon: ArrowUpRight,
      badge: 'Anında Hazır'
    }
  ];

  return (
    <section id="nasil-calisir" className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
          Nasıl Çalışır?
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-3">
          3 basit adımda satış getiren ürün ilanı
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal">
          Karmaşık kopyayazarlığı veya saatler süren anahtar kelime araştırmasını unutun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm p-6 sm:p-7 relative transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                    {item.badge}
                  </span>
                </div>

                <div className="text-xs font-bold text-indigo-600 mb-1">
                  ADIM {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pazaryeri algoritması test edildi</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
