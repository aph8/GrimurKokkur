// src/app/page.tsx
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Grímur Kokkur – Heim',
  description: 'Kynntu þér úrval veisludýrlegra sjávarrétta frá Grími kokki.',
};

export const revalidate = 60; // Endurnýja statískt efni á 60 sek.

export default function HomePage() {
  return <HeroSection />;
}
