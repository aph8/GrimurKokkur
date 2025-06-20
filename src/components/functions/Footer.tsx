// src/components/functions/Footer.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Column 1 */}
        <div className={styles.column}>
          {/* Logo using <Image> */}
          <Image
            src="/Grimur_kokkur_logo.svg"
            alt="Grímur Kokkur logo"
            width={80}
            height={80}
            priority={false}
          />
          <p className={styles.description}>
            Grímur kokkur er fjölskyldufyrirtæki í fremstu röð í framleiðslu á tilbúnum
            sjávarréttum.
          </p>
          {/* Award badge using <Image> */}
          <Image
            src="/RGB_FF%202024-Ice-Red-Horz.png"
            alt="Framúrskarandi fyrirtæki 2024"
            width={256}
            height={68}
            loading="lazy"
          />
          <div className={styles.socialIcons}>
            <Link
              href="https://www.instagram.com/grimurkokkur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <div className={`${styles.icon} ${styles.instagramIcon}`}>
                <Instagram size={32} color="#fff" />
              </div>
            </Link>
            <Link
              href="https://www.facebook.com/Grimurkokkur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <div className={`${styles.icon} ${styles.facebookIcon}`}>
                <Facebook size={32} color="#fff" />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div className={styles.column}>
          <h2>Hafa samband</h2>
          <p>
            <strong>Heimilisfang:</strong> Hlíðavegi 5, 900 Vestmannaeyjar
          </p>
          <p>
            <strong>Sími:</strong> <a href="tel:+3544812665">481 2665</a>
          </p>
          <p>
            <strong>Netfang:</strong>{' '}
            <a href="mailto:grimurkokkur@grimurkokkur.is">grimurkokkur@grimurkokkur.is</a>
          </p>
          <p>
            <strong>Kennitala:</strong> 531205-1460
          </p>
          <Link href="/contact" className={styles.contactButton} prefetch={false}>
            Hafa samband
          </Link>
        </div>

        {/* Column 3 */}
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

      <div className={styles.bottom}>
        {/* Suppress only the dynamic year mismatch */}
        <div className={styles.bottomLeft} suppressHydrationWarning>
          Allur réttur áskilinn. {new Date().getFullYear()}. Grímur Kokkur
        </div>
        <div className={styles.bottomRight}>
          <nav className={styles.navLinks}>
            <Link href="/vorur" prefetch={false}>
              Vörur
            </Link>
            <Link href="/about" prefetch={false}>
              Um Okkur
            </Link>
            <Link href="/contact" prefetch={false}>
              Hafa Samband
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
