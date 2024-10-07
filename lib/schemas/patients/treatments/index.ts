import { z } from 'zod';
import { UserSchema } from '@/lib/schemas/users';
import { ServiceSchema } from '@/lib/schemas/services';
import { PatientSchema } from '@/lib/schemas/patients';

export const createOrUpdateTreatmentSchema = z.object({
  patient: PatientSchema.refine((val) => val, {
    message: 'type invalid',
  }),
  service: ServiceSchema.refine((val) => val, {
    message: 'type invalid',
  }),
  praticien: UserSchema.refine((val) => val, {
    message: 'type invalid',
  }),
  nbSessions: z
    .string({
      required_error: 'Le nombre de séances est requis',
      invalid_type_error: 'Le type du nombre de séances est invalid',
    })
    .min(1, { message: 'Le nombre de séances est requis' }),
  status: z.enum(['IN_PROGRESS' , 'ON_HOLD' , 'COMPLETED' , 'CANCELLED']).optional().default('IN_PROGRESS'),
  data: z.any().optional()
});