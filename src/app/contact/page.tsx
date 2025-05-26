'use client';

export const runtime = 'edge';
export const revalidate = 60;

import React, { useState, useRef, FormEvent } from 'react';
import styles from '@/styles/ContactPage.module.scss';
import { ContactSchema, type ContactInput } from '@/lib/contactSchema';

type Status = 'idle' | 'pending' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState<ContactInput>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const liveRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const result = ContactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrs: Partial<Record<keyof ContactInput, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        fieldErrs[key] = issue.message;
      }
      setErrors(fieldErrs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange =
    (field: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      liveRef.current?.focus();
      return;
    }
    setStatus('pending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);
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
    <main className={styles.container}>
      <h1 className={styles.title}>Hafa samband</h1>

      <div className={styles.contactWrapper}>
        {/* Kort */}
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

        {/* Form */}
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
    </main>
  );
}
