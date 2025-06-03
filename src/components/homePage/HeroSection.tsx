// HeroSection.tsx
'use client';
import { useState, useEffect } from 'react';
import useIsMobile from './useIsMobile';
import DesktopHero from './DesktopHero';
import MobileHeroCarousel from './MobileHeroCarousel';

const panels = [
  { url: '/humarsupa_portrait.jpg', alt: 'Humarsúpa' }, 
  { url: '/fiskibollur_portrait.jpg', alt: 'Fiskibollur' },
  { url: '/fiskistangir_portrait.jpg', alt: 'Fiskistangir' },
  { url: '/plokkfiskur_portrait.jpg', alt: 'Plokkfiskur' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useIsMobile(); // undefined until after mount

  // While not mounted, always show desktop (SSR‐safe)
  if (!mounted) {
    return <DesktopHero panels={panels} />;
  }

  // After hydration on the client:
  if (isMobile) {
    return <MobileHeroCarousel panels={panels} />;
  }
  return <DesktopHero panels={panels} />;
}
