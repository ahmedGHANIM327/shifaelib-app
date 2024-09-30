import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z
    .string({
      required_error: 'Le nom du service est requis',
      invalid_type_error: 'Le type du nom du service est invalid',
    })
    .min(1, { message: 'Le nom du cabinet est requis' }),
  tarif: z
    .string({
      required_error: 'Le tarif est requis',
      invalid_type_error: 'Le type du tarif est invalid',
    })
    .min(1, { message: 'Le tarif est requis' }),
  duration: z
    .string({
      required_error: 'La durée est requis',
      invalid_type_error: 'Le type de la durée est invalid',
    })
    .min(1, { message: 'La durée est requise' }),
  color: z
    .string({
      required_error: 'Le color est requis',
      invalid_type_error: 'Le type du color est invalid',
    })
    .min(1, { message: 'Le color est requis' }),
  config: z.any().optional()
});

export const additionalQuestionTypeSchema = z.object({
  label: z
    .string({
      required_error: 'Le label est requis',
      invalid_type_error: 'Le type du label est invalid',
    })
    .min(1, { message: 'Le label est requis' }),
  type: z.enum(['text', 'select', 'text_select', 'uniq_select', 'text_uniq_select'], {
    required_error: 'Le type est requis',
    message: 'Le type est requis',
  }),
  options: z.array(z.string()).optional().default([]),
});