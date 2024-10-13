import { Treatment } from '@/lib/types/patients/treatments';
import { User } from '@/lib/types/users';
import { Session } from '@/lib/types/patients/sessions';

export type Payment = {
  id: string;
  amount: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  //
  session?: Session;
  treatment: Treatment;
  createdByUser?: User;
  updatedByUser?: User;
}