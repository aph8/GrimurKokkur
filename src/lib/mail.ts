// src/lib/mail.ts

import nodemailer, { Transporter } from 'nodemailer';
import sanitizeHtml from 'sanitize-html';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL, NODE_ENV } = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
  throw new Error('Missing one of SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL');
}

const isDev = NODE_ENV !== 'production';
let transporter: Transporter;
/**
 * Creates and returns a nodemailer transporter instance.
 * Uses environment variables for SMTP configuration.
 */

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: { rejectUnauthorized: !isDev },
      logger: isDev,
      debug: isDev,
    });
  }
  return transporter;
}
/**
 * Sends the contact form email using the transporter.
 */

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const cleanMessage = sanitizeHtml(message, {
    allowedTags: [],
    allowedAttributes: {},
  });

  await getTransporter().verify();

  await getTransporter().sendMail({
    from: `"Kontakt form" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `Ný skilaboð frá Heimasíðu`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${cleanMessage}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr/>
      <p>${cleanMessage.replace(/\n/g, '<br/>')}</p>
    `,
    headers: {
      'X-Message-Received': new Date().toISOString(),
    },
  });
}
