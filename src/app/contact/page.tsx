// src/app/contact/page.tsx

import React from 'react';
import ContactPageClient from './pageClient';
import styles from '@/styles/ContactPage.module.scss';

export const metadata = {
  title: 'Hafa samband – Grímur Kokkur',
  description: 'Sendu okkur skilaboð eða fyrirspurnir í gegnum formið hér að neðan.',
};

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Hafa samband</h1>
      <ContactPageClient />
    </main>
  );
}
