import { Treatment } from '@/lib/types/patients/treatments';
import { User } from '@/lib/types/users';
import { Payment } from '@/lib/types/patients/paiments';
import { z } from 'zod';
import { createSessionSchema, updateSessionSchema } from '@/lib/schemas/patients/sessions';
import { Patient } from '@prisma/client';

export type Session = {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  status: SessionStatus;
  tarif: string;
  note?: string;
  treatmentId: string;
  createdAt: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  //
  payments?: Payment[];
  treatment: Treatment;
  createdByUser?: User;
  updatedByUser?: User;
}

export type SessionsListingFilters = {
  from: Date | null;
  to: Date | null;
}

export type SessionStatus = 'SCHEDULED'| 'ATTENDED'| 'NOT_ATTENDED'| 'CANCELED';

export type CalendarSession = {
  Id: string;
  StartTime: Date;
  EndTime: Date;
  Status: SessionStatus;
  Duration: string;
  Tarif: string;
  Note?: string;
  Treatment: Treatment;
  Payments: Payment[];
}

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;

export type SessionStateActionType = 'SESSION_CREATED' | 'SESSION_UPDATED' | 'SESSION_DELETED';
export type SessionStateAction = {
  type: SessionStateActionType;
  payload: Session | string;
  date: Date;
}

export type CreateSessionProps = {
  open: boolean;
  startTime: Date;
  fiche?: boolean;
  patientId?: string;
  treatmentId?: string;
}

export type AgendaFilters = {
  praticiens: string[];
  patients: string[];
  services: string[];
  status: SessionStatus[];
}