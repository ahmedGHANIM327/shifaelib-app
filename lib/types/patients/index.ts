import { z } from 'zod';
import { createOrUpdatePatientSchema } from '@/lib/schemas/patients';
import { Gender } from '@/lib/types';
import { User } from '@/lib/types/users';

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  phone?: string;
  email?: string;
  address?: string;
  createdAt: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  // Relations
  createdByUser?: User;
  updatedByUser?: User;
}

export type PatientListingFilters = {
  search: string;
  sort: 'creation_date_desc' | 'creation_date_asc';
  gender: 'M' | 'F' | 'ALL';
  createdBy: string[];
}

export type PatientListingPagination = {
  page: number;
  nbItemPerPage: number;
  changed: boolean;
}

export type CreateOrUpdatePatientInput = z.infer<typeof createOrUpdatePatientSchema>;