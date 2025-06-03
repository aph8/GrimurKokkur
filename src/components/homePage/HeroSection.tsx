// src/components/homePage/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import useIsMobile from './useIsMobile';
import DesktopHero from './DesktopHero';
import MobileHeroCarousel from './MobileHeroCarousel';

const panels = [
  { url: '/fiskibollur_portrait.svg', alt: 'Fiskibollur' },
  { url: '/humarsupa_portrait.svg', alt: 'Humarsúpa' },
  { url: '/fiskistangir_portrait.svg', alt: 'Fiskistangir' },
  { url: '/plokkfiskur_portrait.svg', alt: 'Plokkfiskur' },
];

export default function HeroSection() {
  // 1. Track “have we mounted on the client yet?”
  const [mounted, setMounted] = useState(false);

  // 2. After hydration, set mounted = true
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Check our hook -- might be undefined if we haven’t run matchMedia yet.
  const isMobile = useIsMobile();

  // -------------------------------------------
  // 4. If we are still *not mounted*, render the
  //    same thing server rendered: the desktop hero.
  //    (SSR default was DesktopHero.)
  // -------------------------------------------
  if (!mounted) {
    return <DesktopHero panels={panels} />;
  }

  // -------------------------------------------
  // 5. Now that we know we’re on the client:
  //    - if isMobile === true, show the mobile carousel.
  //    - if isMobile === false, show the desktop hero.
  //    - if isMobile is still undefined (rare), default to desktop.
  // -------------------------------------------
  if (isMobile) {
    return <MobileHeroCarousel panels={panels} />;
  } else {
    return <DesktopHero panels={panels} />;
  }
}
