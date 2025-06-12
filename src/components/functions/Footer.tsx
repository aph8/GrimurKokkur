'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.column}>
          <Image
            src="/Grimur_kokkur_logo.svg"
            alt="Grímur Kokkur logo"
            width={80}
            height={80}
            quality={100}
          />
          <p className={styles.description}>
            Grímur kokkur er fjölskyldufyrirtæki í fremstu röð í framleiðslu á tilbúnum
            sjávarréttum.
          </p>
          <Image
            src="/RGB_FF 2024-Ice-Red-Horz.png"
            alt="Framúrskarandi fyrirtæki 2024"
            width={256}
            height={68}
            quality={100}
          />
          <div className={styles.socialIcons}>
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

        <div className={styles.column}>
          <h2>Hafa samband</h2>
          <p>
            <strong>Heimilisfang:</strong> Hlíðavegi 5, 900 Vestmannaeyjar
          </p>
          <p>
            <strong>Sími:</strong>{' '}
            <a href="tel:+3544812665">481 2665</a>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:grimurkokkur@grimurkokkur.is">
              grimurkokkur@grimurkokkur.is
            </a>
          </p>
          <p>
            <strong>Kennitala:</strong> 531205-1460
          </p>
          <Link href="/contact" className={styles.contactButton}>
            Hafa samband
          </Link>
        </div>

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
        <div className={styles.bottomLeft}>
          Allur réttur áskilinn. {new Date().getFullYear()}. Grímur Kokkur
        </div>
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
