import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni | Listora',
  description:
    'Listora gizlilik politikası, çerez kullanımı ve 6698 sayılı KVKK kapsamında kişisel verilerin korunması aydınlatma metni.',
};

export default function GizlilikPage() {
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
            İşbu Gizlilik Politikası ve KVKK Aydınlatma Metni bir taslak olup, ticari canlı faaliyet
            öncesinde mutlaka uzman bir avukat / hukuk danışmanı tarafından incelenmeli ve şirketinize
            özel hale getirilmelidir.
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Shield className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Gizlilik Politikası ve KVKK Aydınlatma Metni
              </h1>
            </div>
            <p className="text-xs text-slate-400">Son Güncelleme: 14 Ekim 2026</p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Giriş ve Amaç</h2>
              <p>
                Listora (&quot;Platform&quot; veya &quot;Biz&quot;) olarak kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat uyarınca; platformumuzu ziyaret eden satıcıların verilerinin nasıl işlendiğini, saklandığını ve korunduğunu açıklamak üzere hazırlanmıştır.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Toplanan Veriler</h2>
              <p>
                Listora, gizlilik odaklı (privacy-first) bir mimariye sahiptir. Platform üzerinde gereksiz hiçbir kişisel veri toplanmaz:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>
                  <strong>Bekleme Listesi (Waitlist) E-postaları:</strong> Listora Pro sürümüne öncelikli erişim talebinde bulunan kullanıcıların kendi açık rızalarıyla form üzerinden ilettikleri e-posta adresleri.
                </li>
                <li>
                  <strong>Anonim Kullanım Sayaçları (Kişisel Olmayan Veri):</strong> Sistem kapasitesini yönetmek ve hizmet kalitesini artırmak amacıyla günlük toplam üretim adedi, seçilen pazar yeri (Trendyol, Etsy vb.), seçilen içerik tonu ve dil tercihi anonim sayaçlar olarak tutulur. Bu sayaçlar herhangi bir gerçek kişi kimliği ile eşleştirilmez.
                </li>
                <li>
                  <strong>Ziyaretçi Tanımlayıcı Çerezler:</strong> Günlük ücretsiz adil kullanım kotasını (günlük 3 üretim hakkı) takip etmek ve spam botları engellemek amacıyla cihazınızda şifrelenmiş, anonim bir oturum çerezi (<code>listora_vid</code>) ve IP adresi karma (hash) değeri kullanılır.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Yapay Zeka ve Ürün Verilerinin İşlenmesi</h2>
              <p>
                Forma girdiğiniz ürün bilgileri (ürün adı, kategori ve temel özellikler) yalnızca talep ettiğiniz içerik üretimini gerçekleştirmek üzere Google Gemini API altyapısına sunucu taraflı güvenli bağlantı üzerinden gönderilir. Ürün verileriniz genel yapay zeka modellerinin eğitilmesi için kullanılmaz ve 3. şahıslarla paylaşılmaz.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Çerez (Cookie) Kullanımı</h2>
              <p>
                Listora yalnızca hizmetin teknik olarak çalışması için zorunlu olan temel çerezleri kullanır. Reklam hedeflemesi veya 3. taraf takip çerezleri (cross-site tracking) kullanılmamaktadır.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">5. KVKK Kapsamındaki Haklarınız</h2>
              <p>
                6698 sayılı KVKK&apos;nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, bekleme listesindeki e-posta kaydının silinmesini talep etme haklarına sahiptir.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
