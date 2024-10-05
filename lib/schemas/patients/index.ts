import { z } from 'zod';

export const createOrUpdatePatientSchema = z.object({
  firstName: z
    .string({
      required_error: 'Le prénom est requis',
      invalid_type_error: 'Le type du prénom est invalid',
    })
    .min(1, 'Le prénom est requis'),
  lastName: z
    .string({
      required_error: 'Le nom est requis',
      invalid_type_error: 'Le type du nom est invalid',
    })
    .min(1, 'Le nom est requis'),
  gender: z.enum(['M', 'F'], {
    required_error: 'Le genre est requis',
    invalid_type_error: 'Le genre doit être M ou F',
    message: 'Le genre doit être M ou F',
  }),
  birthDate: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
});