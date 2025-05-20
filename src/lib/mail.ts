// src/lib/mail.ts
import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_EMAIL,
  NODE_ENV,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
  throw new Error(
    'Missing one of SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL'
  );
}

const isDev = NODE_ENV !== 'production';

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  // Create transporter with STARTTLS + optional cert validation
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,            // false = use STARTTLS, not SSL/TLS on connect
    requireTLS: true,         // force upgrade to TLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      // in dev allow self-signed certs; in prod enforce strict
      rejectUnauthorized: !isDev,
    },
    logger: isDev,            // log to console in dev
    debug: isDev,             // include SMTP debug output
  });

  // verify connection configuration
  await transporter.verify();

  // send the message
  await transporter.sendMail({
    from: `"Kontakt form" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `Ný skilaboð frá ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr/>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });
}
