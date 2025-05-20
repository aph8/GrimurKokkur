import { z } from 'zod';

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, "Nafn má ekki vera tómt")
    .max(100, "Nafn má ekki vera lengra en 100 stafir"),
  email: z
    .string()
    .email("Netfang er ekki gilt"),
  message: z
    .string()
    .min(1, "Skilaboð mega ekki vera tóm")
    .max(2000, "Skilaboð mega ekki vera lengri en 2000 stafir"),
});

export type ContactInput = z.infer<typeof ContactSchema>;
