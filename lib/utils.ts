import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { Gender, PasswordValidationResult, selectOptionsType } from '@/lib/types';
import { User } from '@/lib/types/users';
import { SessionDurations } from '@/lib/constants';
import { Patient } from '@/lib/types/patients';

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

export const getFullName = (entity: User | Patient, withGender = false) => {
  if(withGender) {
    const gender = entity.gender === 'M' ? 'Mr.' : 'Mm.'
    return `${gender} ${entity.firstName} ${entity.lastName}`
  }
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

export const convertGender = (gender: Gender) => {
  return gender === 'M' ? 'Homme' : 'Femme';
}

export const convertTypeQuestion = (type: string) => {
  switch (type) {
    case 'text':
      return 'Text'
    case 'select':
      return 'Options à choix multiple'
    case "text_select":
      return 'Options à choix multiple avec réponse complementaire'
    case "uniq_select":
      return 'Options à choix unique'
    case "text_uniq_select":
      return 'Options à choix unique avec réponse complementaire'
  }
}

export const stringifyDateFormat = (date: Date, format: string) => {
  switch (format) {
    case 'hh:mm':
      return `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`
    case 'frenchLocalDate':
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
    case 'frenchLocalDateTime':
      return date && date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    case 'frenchLocalNumericDateTime':
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    default :
      return `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`
  }
}

export const convertDurationToLabel = (value: string) => {
  return SessionDurations.find(d => d.value === value).label || '';
}