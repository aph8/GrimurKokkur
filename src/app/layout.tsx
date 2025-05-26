// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next"

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
  description: 'Nútímaleg og ljúffeng matarmenning',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Skip link for screen-reader and keyboard users */}
        <a href="#main-content" className="skip-link">
          Sleppa í efni
        </a>

        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />

        {/* Back to top button */}
      </body>
    </html>
  );
}
