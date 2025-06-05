// src/app/page.tsx


import type { Metadata } from 'next';
import HeroSection from '@/components/homePage/HeroSection';

export const metadata: Metadata = {
  title: 'Grímur Kokkur – Heim',
  description: 'Kynntu þér úrval veisludýrlegra sjávarrétta frá Grími kokki.',
};

export default function HomePage() {
  return <HeroSection />;
}
