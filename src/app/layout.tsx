import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grímur Kokkur",
  description: "Nútímaleg og ljúffeng matarmenning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* site-wide header */}
        <Header />
        {/* your page content */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
