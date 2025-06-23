// src/app/contact/pageClient.tsx
'use client';

import React, { useState, useRef, FormEvent } from 'react';
import styles from '@/styles/ContactPage.module.scss';
import MapPlaceholder from '@/components/MapPlaceholder';

type Props = { ts: string; tsSignature: string };
type ContactInput = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type Status = 'idle' | 'pending' | 'success' | 'error';

/**
 * Client side of the contact page handling form state and submission.
 */
export default function ContactPageClient({ ts, tsSignature }: Props) {
  const [form, setForm] = useState<ContactInput>({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'message', string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const liveRef = useRef<HTMLDivElement>(null);

  const handleChange =
    (field: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Nafn má ekki vera tómt';
    if (!form.email.trim()) errs.email = 'Netfang má ekki vera tómt';
    if (!form.message.trim()) errs.message = 'Skilaboð mega ekki vera tóm';
    if (Object.keys(errs).length) {
      setErrors(errs);
      liveRef.current?.focus();
      return false;
    }
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
        body: JSON.stringify({
          ...form,
          ts,
          tsSignature,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Unknown error');

      setStatus('success');
      setForm({ name: '', email: '', message: '', website: '' });
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
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange('website')}
          style={{ display: 'none' }}
          autoComplete="off"
          tabIndex={-1}
        />

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
