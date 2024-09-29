import { CabinetStatus } from '@/lib/types';
import { User } from '@/lib/types/users';
import { z } from 'zod';
import {
  createCabinetSchema,
  updateCabinetSchema,
  weekOpeningHoursSchema,
} from '@/lib/schemas/cabinet';
import { Service } from '@/lib/types/services';

export type Cabinet = {
  id: string;
  name: string;
  address: string;
  status: CabinetStatus;
  subscriptionEndDate: Date;
  phone?: string;
  email?: string;
  speciality: string;
  description?: string;
  openingHours?: object;
  logo?: string;
  //Relations
  users?: User[];
  services?: Service[];
};

export type CreateCabinetInput = z.infer<typeof createCabinetSchema>;
export type UpdateCabinetInput = z.infer<typeof updateCabinetSchema>;
export type WeekOpeningHoursInput = z.infer<typeof weekOpeningHoursSchema>;
