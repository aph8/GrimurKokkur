import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllAboutSections, type AboutSection } from '@/lib/datocms';
import AboutSections from '@/components/about/AboutSections';
import styles from '@/styles/AboutPage.module.scss';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Um okkur – Grímur Kokkur',
  description: 'Kynntu þér sögu okkar, gildi og sýn hjá Grími Kokki.',
  icons: {
    icon: '/Grimur_kokkur_logo.svg',
    shortcut: '/Grimur_kokkur_logo.svg',
    apple: '/Grimur_kokkur_logo.svg',
  },
};

/**
 * Fetches and renders all “about” sections.
 */
export default async function AboutPage() {
  const sections: AboutSection[] | null = await getAllAboutSections();
  if (!sections) return notFound();

  return (
    <main className={styles.main}>
      <AboutSections sections={sections} />
    </main>
  );
}
