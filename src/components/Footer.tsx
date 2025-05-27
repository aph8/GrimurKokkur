// src/components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {

  return (
    <footer className={styles.footer}>
      {/* Top section: exactly 3 equal-width columns */}
      <div className={styles.top}>
        {/* Column 1: Logo, description, award, social */}
        <div className={styles.column}>
          <Image src="/Grimur_kokkur_logo.svg" alt="Grímur Kokkur logo" width={80} height={80} />
          <p className={styles.description}>
            Grímur kokkur er fjölskyldufyrirtæki í fremstu röð í framleiðslu á tilbúnum
            sjávarréttum.
          </p>
          <Image
            src="/RGB_FF 2024-Ice-Red-Horz.png"
            alt="Framúrskarandi fyrirtæki 2024"
            width={240}
            height={60}
          />

          <div className={styles.socialIcons}>
            {/* Instagram */}
            <Link
              href="https://www.instagram.com/grimurkokkur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <div className={styles.icon}>
                <Instagram size={24} />
              </div>
            </Link>

            {/* Facebook */}
            <Link
              href="https://www.facebook.com/Grimurkokkur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <div className={styles.icon}>
                <Facebook size={24} />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 2: Contact */}
        <div className={styles.column}>
          <h3>Hafa samband</h3>
          <p>
            <strong>Heimilisfang:</strong> Hlíðavegi 5, 900 Vestmannaeyjar
          </p>
          <p>
            <strong>Sími:</strong>{' '}
            <a href="tel:+3544812665" className={styles.link}>
              481 2665
            </a>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:grimurkokkur@grimurkokkur.is" className={styles.link}>
              grimurkokkur@grimurkokkur.is
            </a>
          </p>
          <p>
            <strong>Kennitala:</strong> 531205-1460
          </p>
          <Link href="/contact">
            <button className={styles.contactButton}>Hafa samband</button>
          </Link>
        </div>

        {/* Column 3: Opening hours */}
        <div className={styles.column}>
          <h3>Opnunartími</h3>
          <p>
            <strong>Mán – Fös:</strong>
            <br />
            07.00 – 15.00
          </p>
          <p>
            <strong>Lau & Sun:</strong>
            <br />
            Lokað
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        {/* Left: copyright */}
        <div className={styles.bottomLeft}>
          <span>Allur réttur áskilinn. {new Date().getFullYear()}. Grímur Kokkur</span>
        </div>

        {/* Right: nav links + back-to-top */}
        <div className={styles.bottomRight}>
          <nav className={styles.navLinks}>
            <Link href="/vorur">Vörur</Link>
            <Link href="/about">Um Okkur</Link>
            <Link href="/contact">Hafa Samband</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
