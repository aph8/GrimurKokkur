'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Header.module.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/Grimur_kokkur_logo.svg"
            alt="Grímur kokkur logo"
            width={80}
            height={80}
          />
        </Link>

        {/* Hamburger button, shown only ≤768px */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.barOpen : styles.bar} />
          <span className={menuOpen ? styles.barOpen : styles.bar} />
          <span className={menuOpen ? styles.barOpen : styles.bar} />
        </button>

        {/* Nav: always visible on desktop, toggled on mobile */}
        <nav
          className={`${styles.nav} ${
            menuOpen ? styles.navOpen : ''
          }`}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>Heim</Link>
          <Link href="/vorur" onClick={() => setMenuOpen(false)}>Vörur</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>Um okkur</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Hafðu samband</Link>
        </nav>
      </div>
    </header>
  );
}
