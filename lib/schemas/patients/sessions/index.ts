import { z } from 'zod';

export const createSessionSchema = z.object({
  startTime: z.string({
    required_error: 'La date de séance est requise'
  }),
  duration: z
    .string({
      required_error: 'La durée de séance est requise',
      invalid_type_error: 'Le type de la durée de séance est invalid',
    })
    .min(1, { message: 'La durée de séance est requise' }),
  tarif: z
    .string({
      required_error: 'Le tarif de séance est requis',
      invalid_type_error: 'Le type du tarif de séance est invalid',
    })
    .min(1, { message: 'Le tarif de séance est requis' }),
  note: z.string().optional(),
  treatmentId: z
    .string({
      required_error: 'Le traitement est requis',
      invalid_type_error: 'Le type du tarif de séance est invalid',
    })
    .min(1, { message: 'Le traitement est requis' }),
});

export const updateSessionSchema = z.object({
  status: z.enum(['SCHEDULED', 'ATTENDED', 'NOT_ATTENDED', 'CANCELED']).default('SCHEDULED'),
  startTime: z.string({
    required_error: 'La date de séance est requise'
  }),
  duration: z
    .string({
      required_error: 'La durée de séance est requise',
      invalid_type_error: 'Le type de la durée de séance est invalid',
    })
    .min(1, { message: 'La durée de séance est requise' }),
  tarif: z
    .string({
      required_error: 'Le tarif de séance est requis',
      invalid_type_error: 'Le type du tarif de séance est invalid',
    })
    .min(1, { message: 'Le tarif de séance est requis' }),
  note: z.string().optional(),
  treatmentId: z
    .string({
      required_error: 'Le traitement est requis',
      invalid_type_error: 'Le type du tarif de séance est invalid',
    })
    .min(1, { message: 'Le traitement est requis' }),
});