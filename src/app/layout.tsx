import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Listora | Trendyol, Hepsiburada ve Etsy İçin Satış Getiren Ürün İçeriği',
  description:
    'Trendyol, Hepsiburada ve Etsy için saniyeler içinde satış getiren ürün başlığı, açıklaması ve etiketleri üret. Yapay zeka ile pazar yeri algoritmalarına tam uyum.',
  keywords: [
    'trendyol ürün başlığı üretici',
    'hepsiburada seo',
    'etsy 13 tags generator',
    'e-ticaret ürün açıklaması yazma',
    'n11 etiket bulucu',
    'pazar yeri yapay zeka',
    'listora',
  ],
  authors: [{ name: 'Listora' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://listora.vercel.app'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Listora - E-Ticaret Pazar Yeri Yapay Zeka İçerik Motoru',
    description:
      'Trendyol, Hepsiburada ve Etsy için saniyeler içinde satış getiren ürün başlığı, açıklaması ve etiketleri üret.',
    locale: 'tr_TR',
    type: 'website',
    siteName: 'Listora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Listora | E-Ticaret Yapay Zeka Başlık & Açıklama Üretici',
    description:
      'Trendyol, Hepsiburada ve Etsy için saniyeler içinde satış getiren ürün başlığı, açıklaması ve etiketleri üret.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
