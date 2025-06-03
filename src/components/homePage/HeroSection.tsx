// src/components/homePage/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import useIsMobile from './useIsMobile';
import DesktopHero from './DesktopHero';
import MobileHeroCarousel from './MobileHeroCarousel';

const panels = [
  // 1) Humarsúpa is index 0 (LCP on desktop, priority)
  { url: '/humarsupa_portrait.jpg', alt: 'Humarsúpa' },
  { url: '/fiskibollur_portrait.jpg', alt: 'Fiskibollur' },
  { url: '/fiskistangir_portrait.jpg', alt: 'Fiskistangir' },
  { url: '/plokkfiskur_portrait.jpg', alt: 'Plokkfiskur' },
];

export default function HeroSection() {
  // 1) Track if we have mounted on the client yet
  const [mounted, setMounted] = useState(false);

  // 2) After hydration, set mounted = true
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3) Know if we are on mobile (undefined until after mount)
  const isMobile = useIsMobile();

  // 4) While !mounted, render the server’s version (DesktopHero)
  if (!mounted) {
    return <DesktopHero panels={panels} />;
  }

  // 5) After mount, if isMobile===true => mobile, else desktop
  if (isMobile) {
    return <MobileHeroCarousel panels={panels} />;
  }
  return <DesktopHero panels={panels} />;
}
