import { createUserSchema } from '@/lib/schemas/users';
import { z } from 'zod';
import { DefaultOpeningHours } from '@/lib/constants';

export const weekOpeningHoursSchema = z.object({
  monday: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    isClosed: z.boolean().optional(),
  }),
  tuesday: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    isClosed: z.boolean().optional(),
  }),
  wednesday: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    isClosed: z.boolean().optional(),
  }),
  thursday: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    isClosed: z.boolean(),
  }),
  friday: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    isClosed: z.boolean(),
  }),
  saturday: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    isClosed: z.boolean(),
  }),
  sunday: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    isClosed: z.boolean(),
  }),
});

export const createCabinetSchema = z.object({
  name: z
    .string({
      required_error: 'Le nom du cabinet est requis',
      invalid_type_error: 'Le type du nom du cabinet est invalid',
    })
    .min(1, { message: 'Le nom du cabinet est requis' }),
  address: z
    .string({
      required_error: 'L adresse du cabinet est requise',
      invalid_type_error: 'Le type de l adresse du cabinet est invalid',
    })
    .min(1, { message: 'L adresse du cabinet est requise' }),
  subscriptionEndDate: z
    .string({
      required_error: 'date de fin de subscription est requis',
      invalid_type_error: 'Format de date invalide',
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Format de date invalide',
    }),
  phone: z.string().optional(),
  email: z.string().email({ message: 'Adresse e-mail invalide' }).optional(),
  speciality: z
    .string({
      required_error: 'La spécialité du cabinet est requise',
      invalid_type_error: 'Le type de la spécialité du cabinet est invalid',
    })
    .min(1, { message: 'La spécialité du cabinet est requise' }),
  description: z.string().optional(),
  openingHours: weekOpeningHoursSchema.optional().default(DefaultOpeningHours),
  owner: createUserSchema,
});

export const updateCabinetSchema = z.object({
  name: z
    .string({
      required_error: 'Le nom du cabinet est requis',
      invalid_type_error: 'Le type du nom du cabinet est invalid',
    })
    .min(1, { message: 'Le nom du cabinet est requis' }),
  address: z
    .string({
      required_error: 'L adresse du cabinet est requise',
      invalid_type_error: 'Le type de l adresse du cabinet est invalid',
    })
    .min(1, { message: 'L adresse du cabinet est requise' }),
  phone: z.string().optional(),
  email: z.string().email({ message: 'Adresse e-mail invalide' }).optional(),
  speciality: z
    .string({
      required_error: 'La spécialité du cabinet est requise',
      invalid_type_error: 'Le type de la spécialité du cabinet est invalid',
    })
    .min(1, { message: 'La spécialité du cabinet est requise' }),
  description: z.string().optional(),
});
