// src/app/about/page.tsx
export const runtime = 'edge';
export const revalidate = 60;

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllAboutSections, type AboutSection } from '@/lib/datocms';
import AboutSections from '@/components/about/AboutSections';
import styles from '@/styles/AboutPage.module.scss';

export const metadata: Metadata = {
  title: 'Um okkur – Grímur Kokkur',
  description: 'Kynntu þér sögu okkar, gildi og sýn hjá Grími Kokki.',
  icons: {
    icon: '/Grimur_kokkur_logo.svg',
    shortcut: '/Grimur_kokkur_logo.svg',
    apple: '/Grimur_kokkur_logo.svg',
  },
};

export default async function AboutPage() {
  const sections: AboutSection[] | null = await getAllAboutSections();
  if (!sections) return notFound();

  return (
    <main className={styles.main}>
      {/* Explicit <h1> reserves space so nothing “jumps” when the hero image arrives */}
      <h1 className={styles.pageTitle}>Um okkur</h1>
      <AboutSections sections={sections} />
    </main>
  );
}
