import { Treatment } from '@/lib/types/patients/treatments';
import { User } from '@/lib/types/users';
import { Session } from '@/lib/types/patients/sessions';

export type Payment = {
  id: string;
  amount: string;
  date: Date;
  createdBy?: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt: Date;
  treatmentId: string;
  sessionId?: string;
  //
  session?: Session;
  treatment?: Treatment;
  createdByUser?: User;
  updatedByUser?: User;
}

export type CreateOrUpdatePaymentInput = {
  amount: string;
  date: string;
  treatmentId: string;
  sessionId?: string;
}

export type PaymentStateActionType = 'PAYMENT_CREATED' | 'PAYMENT_UPDATED' | 'PAYMENT_DELETED';
export type PaymentStateAction = {
  type: PaymentStateActionType;
  payload: string;
  date: Date;
}