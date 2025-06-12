'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook } from 'lucide-react';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Column 1 */}
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
            {/* Instagram with gradient glyph */}
            <Link
              href="https://www.instagram.com/grimurkokkur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="24"
                  height="24"
                >
                  <defs>
                    <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#instaGradient)"
                    d="M349.33,69.33H162.67A93.34,93.34,0,0,0,69.33,162.67V349.33A93.34,93.34,0,0,0,162.67,442.67H349.33A93.34,93.34,0,0,0,442.67,349.33V162.67A93.34,93.34,0,0,0,349.33,69.33Zm61.33,279.99a61.42,61.42,0,0,1-61.33,61.33H162.67a61.42,61.42,0,0,1-61.33-61.33V162.67a61.42,61.42,0,0,1,61.33-61.33H349.33a61.42,61.42,0,0,1,61.33,61.33Zm-146.66-61.33A85.34,85.34,0,1,1,298,202.66,85.43,85.43,0,0,1,264,287.99Zm88-158.66a20,20,0,1,1-20,20A20,20,0,0,1,352,129.33Z"
                  />
                </svg>
              </div>
            </Link>

            {/* Facebook with white glyph */}
            <Link
              href="https://www.facebook.com/Grimurkokkur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <div className={styles.icon}>
                <Facebook size={24} color="#fff" />
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

      {/* Bottom row */}
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
