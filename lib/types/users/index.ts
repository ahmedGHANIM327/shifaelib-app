import { Gender, UserStatus } from '@/lib/types';
import { Cabinet } from '@/lib/types/cabinet';
import { z } from 'zod';
import {
  createUserSchema,
  requestResetPasswordSchema,
  resetPasswordUserSchema, updateCurrentUserSchema,
  updatePasswordUserSchema,
  updateUserSchema
} from '@/lib/schemas/users';
import { Patient } from '@/lib/types/patients';
import { Session } from '@/lib/types/patients/sessions';
import { Payment } from '@/lib/types/patients/paiments';
import { Treatment } from '@/lib/types/patients/treatments';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  email: string;
  password?: string;
  photo?: string;
  gender: Gender;
  phone?: string;
  isOwner: boolean;
  isTemporaryPassword: boolean;
  cabinetId: string;
  createdAt: Date;
  updatedAt?: Date;
  //Relations
  cabinet?: Cabinet;
  patientsCreated?: Patient[];
  patientsUpdated?: Patient[];
  treatmentsCreated?: Treatment[];
  treatmentsUpdated?: Treatment[];
  sessionsCreated?: Session[];
  sessionsUpdated?: Session[];
  paymentsCreated?: Payment[];
  paymentsUpdated?: Payment[];
  treatments?: Treatment[];
};

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdatePasswordUserInput = z.infer<typeof updatePasswordUserSchema>;
export type UpdateCurrentUserInput = z.infer<typeof updateCurrentUserSchema>;

export type LoginUserType = {
  email: string;
  password: string;
};

export type ResetPasswordUserInput = z.infer<typeof resetPasswordUserSchema>;
export type RequestResetPasswordUserInput = z.infer<
  typeof requestResetPasswordSchema
>;

export type ResetPasswordJwtPayload = {
  id: string;
}
