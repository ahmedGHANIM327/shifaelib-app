import { z } from 'zod';
import { createOrUpdateTreatmentSchema } from '@/lib/schemas/patients/treatments';

export type CreateOrUpdateTreatmentInput = z.infer<typeof createOrUpdateTreatmentSchema>;