import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createCabinetSchema } from '@/lib/schemas/cabinet';
import { z } from 'zod';
import { PasswordValidationResult, selectOptionsType } from '@/lib/types';
import { User } from '@/lib/types/users';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatZodValidationErrors = (errors: any[]): string => {
  return errors
    .map(({ path, message }) => {
      const formattedPath = path.join('.');
      return `${formattedPath}: ${message}`;
    })
    .join(' , ');
};

export const zodValidationData = async (data: any, zodSchema: z.ZodSchema) => {
  const validatedData = await zodSchema.safeParseAsync(data);
  if (!validatedData.success) {
    throw new Error(formatZodValidationErrors(validatedData.error.errors));
  }
  return validatedData.data;
};

export const isValidUUIDv4 = (uuid: string): void => {
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidV4Regex.test(uuid)) {
    throw new Error('INVALID_ID');
  }
};

export const validatePassword = (
  password: string,
  email: string | null,
): PasswordValidationResult => {
  const isValidLength = password ? password.length >= 8 : false;
  const isNotEmail =
    email === null || (password && email ? password !== email : false);
  const hasUppercase = password ? /[A-Z]/.test(password) : false;
  const hasLowercase = password ? /[a-z]/.test(password) : false;
  const hasDigit = password ? /\d/.test(password) : false;
  const hasSpecialChar = password ? /[!@#\$%&]/.test(password) : false;

  return {
    isValidLength,
    isNotEmail,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar,
  };
};

export const getFullName = (entity: User) => {
  return `${entity.firstName} ${entity.lastName}`;
};
export const getInitials = (entity: User): string => {
  const firstName = entity.firstName;
  const lastName = entity.lastName;
  const words: string[] = [firstName, lastName];
  return words
    .filter((w) => w !== undefined)
    .map((word) => word.charAt(0))
    .join('');
};

export const transformArrayToTypeOptions = (array: string[]): selectOptionsType[] => {
  return array && array.map((type: string) => ({
    label: type,
    value: type
  }));
}
