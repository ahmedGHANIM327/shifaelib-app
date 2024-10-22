import { z } from 'zod';

export const createOrUpdatePaymentSchema = z.object({
  date: z.string().optional(),
  amount: z
    .string({
      required_error: 'Ce champs est requis',
    })
    .min(1, { message: 'Ce champs est requis' }),
});