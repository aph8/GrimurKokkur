// src/app/contact/page.tsx
import React from 'react';
import ContactPageClient from './pageClient';
import styles from '@/styles/ContactPage.module.scss';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import crypto from 'crypto';

export const metadata = {
  title: 'Hafa samband – Grímur Kokkur',
  description: 'Sendu okkur skilaboð eða fyrirspurnir í gegnum formið hér að neðan.',
};

/**
 * Generate a short‐lived HMAC of the current timestamp,
 * then pass both ts & signature to the client.
 */
export default function ContactPage() {
  const ts = Date.now().toString();
  const sig = crypto.createHmac('sha256', process.env.TS_TOKEN_SECRET!).update(ts).digest('hex');

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{ async: true, defer: true, appendTo: 'body' }}
    >
      <main className={styles.container}>
        <h1 className={styles.title}>Hafa samband</h1>
        <ContactPageClient ts={ts} tsSignature={sig} />
      </main>
    </GoogleReCaptchaProvider>
  );
}
