// src/app/contact/page.client.tsx
'use client';

import React, { useState, useRef, FormEvent } from 'react';
import styles from '@/styles/ContactPage.module.scss';
import MapPlaceholder from '@/components/MapPlaceholder';

type ContactInput = {
  name: string;
  email: string;
  message: string;
};

type Status = 'idle' | 'pending' | 'success' | 'error';

export default function ContactPageClient() {
  const [form, setForm] = useState<ContactInput>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const liveRef = useRef<HTMLDivElement>(null);

  const handleChange =
    (field: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactInput, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Nafn má ekki vera tómt';
    if (!form.email.trim()) newErrors.email = 'Netfang má ekki vera tómt';
    if (!form.message.trim()) newErrors.message = 'Skilaboð mega ekki vera tóm';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      liveRef.current?.focus();
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('pending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        const errMsg = (json.errors?._errors ?? json.error) as string | undefined;
        throw new Error(errMsg || 'Unknown error');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setErrors({});
      liveRef.current?.focus();
    } catch {
      setStatus('error');
      liveRef.current?.focus();
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.mapWrapper}>
        <div className={styles.mapContainer}>
          <MapPlaceholder />
        </div>
      </div>

      <form className={styles.formWrapper} onSubmit={handleSubmit} noValidate>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Upplýsingar</legend>

          <div className={styles.formGroup}>
            <label htmlFor="name">Nafn</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'err-name' : undefined}
              disabled={status === 'pending'}
              required
              minLength={1}
              maxLength={100}
            />
            {errors.name && (
              <p id="err-name" className={styles.error}>
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Netfang</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
              disabled={status === 'pending'}
              required
            />
            {errors.email && (
              <p id="err-email" className={styles.error}>
                {errors.email}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Skilaboð</label>
            <textarea
              id="message"
              rows={6}
              value={form.message}
              onChange={handleChange('message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'err-message' : undefined}
              disabled={status === 'pending'}
              required
              minLength={1}
              maxLength={2000}
            />
            {errors.message && (
              <p id="err-message" className={styles.error}>
                {errors.message}
              </p>
            )}
          </div>
        </fieldset>

        <button type="submit" className={styles.submitButton} disabled={status === 'pending'}>
          {status === 'pending' ? 'Sæki...' : 'Senda'}
        </button>

        <div
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          ref={liveRef}
          className={styles.liveMessage}
        >
          {status === 'success' && <p className={styles.success}>Skilaboðin voru send!</p>}
          {status === 'error' && <p className={styles.error}>Villa kom upp. Reyndu aftur.</p>}
        </div>
      </form>
    </div>
  );
}
