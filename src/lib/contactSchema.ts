// src/lib/contactSchema.ts

import { z } from 'zod';

const trimmedString = (min?: number, minMsg?: string, max?: number, maxMsg?: string) =>
  z.preprocess(
    (val) => (typeof val === 'string' ? val.trim() : val),
    z
      .string()
      .refine((s) => (min !== undefined ? s.length >= min : true), {
        message: minMsg,
      })
      .refine((s) => (max !== undefined ? s.length <= max : true), {
        message: maxMsg,
      }),
  );

export const ContactSchema = z
  .object({
    name: trimmedString(1, 'Nafn má ekki vera tómt', 100, 'Nafn má ekki vera lengra en 100 stafir'),
    email: z.preprocess(
      (val) => (typeof val === 'string' ? val.trim() : val),
      z.string().email('Netfang er ekki gilt'),
    ),
    message: trimmedString(
      1,
      'Skilaboð mega ekki vera tóm',
      2000,
      'Skilaboð mega ekki vera lengri en 2000 stafir',
    ),
  })
  .strict();

export type ContactInput = z.infer<typeof ContactSchema>;
