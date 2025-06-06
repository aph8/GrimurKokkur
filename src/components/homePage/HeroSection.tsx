// src/components/homePage/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import useIsMobile from './useIsMobile';
import DesktopHero from './DesktopHero';
import MobileHeroCarousel from './MobileHeroCarousel';
import humarsupa from '../../../public/humarsupa_portrait.jpg';
import fiskibollur from '../../../public/fiskibollur_portrait.jpg';
import fiskistangir from '../../../public/fiskistangir_portrait.jpg';
import plokkfiskur from '../../../public/plokkfiskur_portrait.jpg';

const panels = [
  { src: humarsupa, alt: 'Humarsúpa' },
  { src: fiskibollur, alt: 'Fiskibollur' },
  { src: fiskistangir, alt: 'Fiskistangir' },
  { src: plokkfiskur, alt: 'Plokkfiskur' },
];
/**
 * Chooses between the mobile carousel and desktop hero based on screen size.
 */

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useIsMobile();

  if (!mounted) {
    return <DesktopHero panels={panels} />;
  }

  return isMobile ? (
    <MobileHeroCarousel panels={panels} startImmediately />
  ) : (
    <DesktopHero panels={panels} />
  );
}
