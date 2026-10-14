import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
