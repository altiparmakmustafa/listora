import { GeneratedResult, PresetSample, PlatformType } from '../types';

export const PLATFORM_CONFIG: Record<
  PlatformType,
  {
    name: string;
    color: string;
    badgeBg: string;
    borderColor: string;
    titleLimit: number;
    tagLimit: number;
    recommendedTagCount: string;
    tips: string;
  }
> = {
  Trendyol: {
    name: 'Trendyol',
    color: '#f27a1a',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    borderColor: 'border-orange-500',
    titleLimit: 100,
    tagLimit: 10,
    recommendedTagCount: '10 arama terimi',
    tips: 'Marka + Cinsiyet + Ürün + Renk + Önemli Özellik dizilimi önerilir.'
  },
  Hepsiburada: {
    name: 'Hepsiburada',
    color: '#ff6000',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-amber-500',
    titleLimit: 120,
    tagLimit: 12,
    recommendedTagCount: '8-12 anahtar kelime',
    tips: 'Net teknik detaylar ve kullanım amacı başlıkta yer almalıdır.'
  },
  N11: {
    name: 'N11',
    color: '#5e35b1',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: 'border-purple-500',
    titleLimit: 100,
    tagLimit: 10,
    recommendedTagCount: '10 etiket',
    tips: 'Arama kelimelerinin ilk 60 karakterde yer alması dönüşümü artırır.'
  },
  Etsy: {
    name: 'Etsy',
    color: '#f1641e',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    borderColor: 'border-rose-500',
    titleLimit: 140,
    tagLimit: 13,
    recommendedTagCount: 'Maksimum 13 tag',
    tips: 'Tüm 13 etiketi tam kullanın, uzun kuyruklu (long-tail) aramalara odaklanın.'
  }
};

export const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'linen-shirt',
    label: 'Keten Gömlek',
    category: 'Kadın Giyim / Gömlek',
    data: {
      title: 'Oversize Saf Keten Kısa Kollu Gömlek',
      category: 'Kadın Giyim / Gömlek & Bluz',
      features: '%100 doğal nefes alabilen keten kumaş, terletmeyen hafif doku, sedef düğme detaylı, salaş dökümlü kalıp, makinede 30 derecede yıkanabilir.',
      targetAudience: 'Yaz aylarında ve tatilde hem şık hem de konforlu giyinmek isteyen kadınlar',
      tone: 'İkna edici',
      platform: 'Trendyol',
      language: 'tr'
    }
  },
  {
    id: 'ceramic-mug',
    label: 'Seramik Kupa',
    category: 'Ev & Yaşam / Mutfak',
    data: {
      title: 'El Yapımı Rustik Seramik Kahve Kupası',
      category: 'Ev & Yaşam / Mutfak & Sofra',
      features: 'El tornasında şekillendirilmiş, 350 ml kapasiteli, gıdaya uygun doğal sır kaplama, bulaşık makinesinde yıkanabilir, mikrodalga uyumlu, ergonomik kulplu.',
      targetAudience: 'Filtre kahve severler, minimalist ev dekorasyonu tutkunları ve özel hediye arayanlar',
      tone: 'Samimi',
      platform: 'Etsy',
      language: 'tr'
    }
  },
  {
    id: 'anc-headphones',
    label: 'ANC Kulaklık',
    category: 'Elektronik / Ses',
    data: {
      title: 'Aktif Gürültü Engelleyici (ANC) Bluetooth Kulak Üstü Kulaklık',
      category: 'Elektronik / Kulaklıklar',
      features: '40 dB hibrit ANC gürültü engelleme, 45 saat kesintisiz pil ömrü, Bluetooth 5.3 hızlı bağlantı, katlanabilir hafif gövde, Type-C hızlı şarj, çoklu cihaz eşleşme.',
      targetAudience: 'Ofiste ve seyahatte odaklanmak isteyen çalışanlar, öğrenciler ve müzik tutkunları',
      tone: 'Profesyonel',
      platform: 'Hepsiburada',
      language: 'tr'
    }
  },
  {
    id: 'vitamin-c-serum',
    label: 'C Vitamini Serumu',
    category: 'Kozmetik / Cilt Bakımı',
    data: {
      title: 'Saf %15 C Vitamini ve Hyaluronik Asit Aydınlatıcı Yüz Serumu',
      category: 'Kozmetik & Kişisel Bakım / Cilt Bakımı',
      features: '%15 saf C vitamini, %2 hyaluronik asit ve ferulik asit kombinasyonu, leke karşıtı bakım, 30 ml damlalıklı cam şişe, vegan ve dermatolojik olarak test edilmiş formül.',
      targetAudience: 'Cilt tonunu eşitlemek, ışıltı kazanmak ve güneş lekelerini azaltmak isteyen kullanıcılar',
      tone: 'Profesyonel',
      platform: 'Trendyol',
      language: 'tr'
    }
  }
];

export const INITIAL_RESULT: GeneratedResult = {
  title: 'Trend Kadın Bej %100 Doğal Saf Keten Dökümlü Salaş Kısa Kollu Yazlık Gömlek',
  titleCharLimit: 100,
  description: 'Sıcak yaz günlerinde ferahlıktan ve zarafetten ödün vermek istemeyenler için özel olarak tasarlanan Listora Keten Gömlek, %100 doğal keten liflerinin benzersiz nefes alma özelliğiyle gün boyu maksimum konfor sunar.\n\nÖzenle işlenmiş sedef düğmeleri, dökümlü salaş kesimi ve modern gömlek yakası sayesinde hem plajda şortlarınızın üzerinde hem de şehirde keten pantolonlarla sofistike kombinler yaratabilirsiniz. Cildinize temas ettiğinde yumuşacık bir his bırakan doğal dokusu, terletmeyen yapısıyla en sıcak günlerde bile kurtarıcınız olacak.',
  bulletPoints: [
    '%100 Doğal Keten Dokuma: Nefes alan yapısıyla terletmez, sıcak havalarda gün boyu serin ve ferah tutar.',
    'Konforlu Salaş / Oversize Kesim: Rahat hareket alanı sağlayan modern dökümüyle her bedene mükemmel uyum sağlar.',
    'Zarif Sedef Düğme Detayı: Kaliteli dikiş işçiliği ve şık düğmeleriyle hem günlük hem özel kombinlere uygundur.',
    'Kolay Bakım & Dayanıklı Kumaş: Formunu uzun süre koruyan yüksek kaliteli dokuma, 30°C hassas yıkamaya uygundur.',
    'Çok Yönlü Kombin İmkânı: Jean, keten şort veya eteklerle plajdan şehir yaşamına zahmetsiz şıklık sunar.'
  ],
  tags: [
    'keten gömlek',
    'kadın yazlık gömlek',
    'oversize gömlek',
    'saf keten',
    'bej gömlek',
    'nefes alan kumaş',
    'salaş gömlek',
    'trend gömlek',
    'yazlık kombin',
    'tatil kıyafeti'
  ],
  platform: 'Trendyol',
  tone: 'İkna edici',
  language: 'tr',
  generatedAt: 'Bugün 14:32'
};

export const BEFORE_AFTER_DATA = {
  before: {
    title: 'Keten Gömlek Bej Kadın',
    charCount: 23,
    ctr: '%1.2',
    description: 'Güzel bej keten gömlek. Yazın giyilir. Düğmelidir. Rahat kumaşı vardır. 38-42 beden uyumludur.',
    bullets: ['Keten kumaş', 'Düğmeli', 'Bej renk'],
    tags: ['gömlek', 'keten', 'kadın']
  },
  after: {
    title: 'Kadın Bej %100 Saf Doğal Keten Salaş Kısa Kollu Terletmeyen Yazlık Gömlek',
    charCount: 75,
    ctr: '%4.8',
    description: '%100 doğal nefes alabilen keten kumaşıyla gün boyu terletmeyen ferahlık. Sedef düğmeli lüks işçilik ve modern oversize dökümüyle hem plajda hem ofiste zahmetsiz şıklık.',
    bullets: [
      '%100 Doğal Saf Keten: Üstün hava geçirgenliği ile terletmez',
      'Modern Oversize Kalıp: Vücudu sıkmayan ferah ve dökümlü duruş',
      'Lüks Sedef Düğmeler: Dayanıklı çift dikişli premium detaylar',
      'Kolay Bakım: 30°C hassas yıkamada solmayan doğal lifler',
      'Kurtarıcı Parça: Jean ve şortlarla anında şık e-ticaret kombini'
    ],
    tags: ['keten gömlek', 'yazlık gömlek', 'kadın keten bluz', 'saf keten', 'oversize gömlek', 'plaj kombini', 'doğal kumaş', 'terletmeyen gömlek', 'trend giyim', 'salaş gömlek']
  }
};

export const FAQ_ITEMS = [
  {
    q: 'Listora hangi pazaryerlerini ve platformları destekliyor?',
    a: 'Listora şu an Türkiye ve global e-ticaret pazarında en çok satış yapılan Trendyol, Hepsiburada, N11 ve Etsy algoritmalarına özel olarak eğitilmiştir. Her pazaryerinin başlık karakter sınırları, arama dizilimi kuralları ve etiketleme mantığı birbirinden farklıdır; Listora seçtiğiniz platforma göre otomatik optimize eder.'
  },
  {
    q: 'Listora ile üretilen açıklamalar pazaryeri SEO sıralamasını nasıl etkiler?',
    a: 'Trendyol ve Hepsiburada arama algoritmaları, ürün başlığındaki ilk kelimelere, açıklamadaki anahtar kelime yoğunluğuna ve öne çıkan özellik maddelerine büyük puan verir. Listora, arama hacmi yüksek kelimeleri ürününüzün özellikleriyle harmanlayarak listelemenizin aramalarda ilk sayfada yer almasını ve tıklama oranınızın (CTR) artmasını sağlar.'
  },
  {
    q: 'Ücretsiz beta sürümünde günlük kullanım sınırı nedir?',
    a: 'Beta sürecinde tüm online satıcılara günlük 3 adet tam teşekküllü ürün açıklaması paketi (Başlık, Açıklama, 5 Madde ve 10-13 Etiket) tamamen ücretsiz olarak sunulmaktadır. Günlük haklarınız her gece 00:00 saatinde otomatik olarak yenilenir.'
  },
  {
    q: 'Üretilen metinleri doğrudan mağazamda kullanabilir miyim?',
    a: 'Evet, kesinlikle! Her içerik kartında bulunan tek tıkla "Kopyala" düğmesini kullanarak başlığı, açıklamayı veya etiketleri doğrudan Trendyol Satıcı Paneli, Hepsiburada İş Ortağım veya Etsy Listing Manager panellerinize yapıştırıp hemen yayına alabilirsiniz.'
  },
  {
    q: 'Yakında çıkacak olan Listora Pro neler sunacak?',
    a: 'Pro sürümde sınırsız günlük üretim, Excel veya CSV ile 500+ ürünü tek tıkla toplu üretme, Trendyol ve Hepsiburada mağazanıza otomatik entegrasyon, rakip mağazaların en çok satan kelimelerini analiz etme ve çok dilli çeviri desteği yer alacaktır. Erken erişim için e-postanızı bırakabilirsiniz.'
  }
];
