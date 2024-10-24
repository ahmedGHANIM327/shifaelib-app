import { z } from 'zod';
import { createOrUpdateTreatmentSchema } from '@/lib/schemas/patients/treatments';
import { Patient } from '@prisma/client';
import { User } from '@/lib/types/users';
import { Service } from '@/lib/types/services';
import { Session } from '@/lib/types/patients/sessions';
import { Payment } from '@/lib/types/patients/paiments';

export type Treatment = {
  id: string;
  code: string;
  nbSessions: string;
  status: TreatmentStatus;
  data: object;
  createdAt: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  serviceId?: string;
  responsibleId?: string;
  patientId: string;
  // relations
  sessions?: Session[];
  payments?: Payment[];
  patient?: Patient;
  responsible?: User;
  service?: Service;
  createdByUser?: User;
  updatedByUser?: User;
}

export type CreateOrUpdateTreatmentInput = z.infer<typeof createOrUpdateTreatmentSchema>;

export type TreatmentStatus = 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';

export type TreatmentListingFilters = {
  search: string;
  sort: 'creation_date_desc' | 'creation_date_asc';
  status: 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED'  | 'CANCELLED' | 'ALL';
  patient: string[];
  service: string[];
  responsible: string[];
}

export type TreatmentStateActionType = 'TREATMENT_CREATED' | 'TREATMENT_UPDATED' | 'TREATMENT_DELETED';
export type TreatmentStateAction = {
  type: TreatmentStateActionType;
  payload: string;
  date: Date;
}