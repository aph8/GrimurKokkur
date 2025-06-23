// src/app/contact/page.tsx
import React from 'react';
import ContactPageClient from './pageClient';
import styles from '@/styles/ContactPage.module.scss';
import { createHmac } from 'crypto';

export const metadata = {
  title: 'Hafa samband – Grímur Kokkur',
  description: 'Sendu okkur skilaboð eða fyrirspurnir í gegnum formið hér að neðan.',
};

/**
 * Static contact page that signs a timestamp token and passes it to the client component.
 */
export default function ContactPage() {
  const ts = Date.now().toString();
  const tsSignature = createHmac('sha256', process.env.TS_TOKEN_SECRET!).update(ts).digest('hex');

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Hafa samband</h1>
      <ContactPageClient ts={ts} tsSignature={tsSignature} />
    </main>
  );
}
