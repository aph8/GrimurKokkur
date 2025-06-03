// src/app/layout.tsx
export const runtime = 'edge';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.scss';
import Header from '@/components/functions/Header';
import Footer from '@/components/functions/Footer';
import { Analytics } from '@vercel/analytics/next';
import BackToTop from '@/components/functions/BackToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Grímur Kokkur',
  description: 'Heimasíða Gríms kokks með úrval sjávarrétta.',
  icons: {
    icon: '/Grimur_kokkur_logo.svg',
    shortcut: '/Grimur_kokkur_logo.svg',
    apple: '/Grimur_kokkur_logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      {/* No <head> tag here! */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Sleppa í efni
        </a>

        <Header />

        <main id="main-content">{children}</main>

        <Footer />
        <Analytics />

        <BackToTop />
      </body>
    </html>
  );
}
