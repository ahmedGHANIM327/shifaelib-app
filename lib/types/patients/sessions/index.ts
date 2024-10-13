import { Treatment } from '@/lib/types/patients/treatments';
import { User } from '@/lib/types/users';
import { Payment } from '@/lib/types/patients/paiments';

export type Session = {
  id: string;
  startTime: Date;
  endTime: Date;
  status: SessionStatus;
  tarif: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
  //
  payments?: Payment[];
  treatment: Treatment;
  createdByUser?: User;
  updatedByUser?: User;
}

export type SessionsListingFilters = {
  sort: 'creation_date_desc' | 'creation_date_asc' | 'start_time_desc' | 'start_time_asc';
  status: 'SCHEDULED' | 'ATTENDED' | 'NOT_ATTENDED'  | 'CANCELED' | 'ALL';
  patient: string[];
  service: string[];
  responsible: string[];
  from: Date | null;
  to: Date | null;
}

export type SessionStatus = 'SCHEDULED'| 'ATTENDED'| 'NOT_ATTENDED'| 'CANCELED';