// src/app/page.tsx
export const revalidate = 60;

import type { Metadata } from 'next';
import HeroSection from '@/components/homePage/HeroSection';

export const metadata: Metadata = {
  title: 'Grímur Kokkur – Heim',
  description: 'Kynntu þér úrval veisludýrlegra sjávarrétta frá Grími kokki.',
};

export default function HomePage() {
  return <HeroSection />;
}
