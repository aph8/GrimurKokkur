// src/app/about/page.tsx
export const runtime    = 'edge';
export const revalidate = 60;

import { notFound } from 'next/navigation';
import { getAllAboutSections, type AboutSection } from '@/lib/datocms';
import AboutSections from '@/components/AboutSections';
import styles from '@/styles/AboutPage.module.scss';

export default async function AboutPage() {
  const sections: AboutSection[] | null = await getAllAboutSections();
  if (!sections) return notFound();

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Um okkur</h1>
      <AboutSections sections={sections} />
    </main>
  );
}
