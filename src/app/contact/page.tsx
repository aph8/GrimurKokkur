'use client';

import React, { useState } from 'react';
import styles from '@/styles/ContactPage.module.scss';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'pending'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('pending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Hafa samband</h1>

      <div className={styles.contactWrapper}>
        {/* Map panel */}
        <div className={styles.mapWrapper}>
          <div className={styles.mapContainer}>
            <iframe
              title="Grímur Kokkur staðsetning"
              src="https://maps.google.com/maps?q=Hl%C3%AD%C3%B0avegur%205%2C%20900%20Vestmannaeyjar&z=17&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Form panel */}
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nafn</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Netfang</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Skilaboð</label>
              <textarea
                id="message"
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === 'pending'}
            >
              {status === 'pending' ? 'Senda...' : 'Senda'}
            </button>

            {status === 'success' && (
              <p className={styles.success}>Skilaboðin voru send!</p>
            )}
            {status === 'error' && (
              <p className={styles.error}>Villa við að senda. Reyndu aftur.</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
