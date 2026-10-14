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
            İşbu Gizlilik Politikası ve KVKK Aydınlatma Metni bir taslak olup, ticari canlı faaliyet
            öncesinde mutlaka uzman bir avukat / hukuk danışmanı tarafından incelenmeli ve şirketinize
            özel hale getirilmelidir.
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-12 space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Shield className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Gizlilik Politikası ve KVKK Aydınlatma Metni
              </h1>
            </div>
            <p className="text-xs text-slate-400">Son Güncelleme: 14 Ekim 2026</p>
          </div>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Giriş ve Amaç</h2>
              <p>
                Listora (&quot;Platform&quot; veya &quot;Biz&quot;) olarak kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat uyarınca; platformumuzu ziyaret eden satıcıların verilerinin nasıl işlendiğini, saklandığını ve korunduğunu açıklamak üzere hazırlanmıştır.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Toplanan Veriler</h2>
              <p>
                Listora, gizlilik odaklı (privacy-first) bir mimariye sahiptir. Platform üzerinde gereksiz hiçbir kişisel veri toplanmaz:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>
                  <strong>Bekleme Listesi (Waitlist) E-postaları:</strong> Listora Pro sürümüne öncelikli erişim talebinde bulunan kullanıcıların kendi açık rızalarıyla form üzerinden ilettikleri e-posta adresleri.
                </li>
                <li>
                  <strong>Anonim Kullanım Sayaçları (Kişisel Olmayan Veri):</strong> Sistem kapasitesini yönetmek ve hizmet kalitesini artırmak amacıyla günlük toplam üretim adedi, seçilen pazar yeri (Trendyol, Etsy vb.), seçilen içerik tonu ve dil tercihi anonim sayaçlar olarak tutulur. Bu sayaçlar herhangi bir gerçek kişi kimliği ile eşleştirilmez.
                </li>
                <li>
                  <strong>Ziyaretçi Tanımlayıcı Çerezler:</strong> Günlük ücretsiz adil kullanım kotasını (örneğin günlük 15 üretim hakkı) takip etmek ve spam botları engellemek amacıyla cihazınızda şifrelenmiş, anonim bir oturum çerezi (<code>listora_vid</code>) ve IP adresi karma (hash) değeri kullanılır.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Yapay Zeka ve Ürün Verilerinin İşlenmesi</h2>
              <p>
                Forma girdiğiniz ürün bilgileri (ürün adı, kategori ve temel özellikler) yalnızca talep ettiğiniz içerik üretimini gerçekleştirmek üzere Google Gemini API altyapısına sunucu taraflı güvenli bağlantı üzerinden gönderilir. Ürün verileriniz genel yapay zeka modellerinin eğitilmesi için kullanılmaz ve 3. şahıslarla paylaşılmaz.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Çerez (Cookie) Kullanımı</h2>
              <p>
                Listora yalnızca hizmetin teknik olarak çalışması için zorunlu olan temel çerezleri kullanır. Reklam hedeflemesi veya 3. taraf takip çerezleri (cross-site tracking) kullanılmamaktadır.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">5. KVKK Kapsamındaki Haklarınız</h2>
              <p>
                6698 sayılı KVKK&apos;nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, bekleme listesindeki e-posta kaydının silinmesini talep etme haklarına sahiptir.
              </p>
              <p>
                Haklarınızı kullanmak veya bekleme listesinden çıkmak için platform yöneticileriyle iletişime geçebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
