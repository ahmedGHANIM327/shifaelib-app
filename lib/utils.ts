import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { Gender, PasswordValidationResult, selectOptionsType } from '@/lib/types';
import { User } from '@/lib/types/users';
import { SessionDurations } from '@/lib/constants';
import { Patient } from '@/lib/types/patients';
import { Treatment, TreatmentStatus } from '@/lib/types/patients/treatments';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import patient from '@/stores/patient';
import { View } from '@syncfusion/ej2-schedule';

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
  if(entity) {
    if(withGender) {
      const gender = entity.gender === 'M' ? 'Mr.' : 'Mm.'
      return `${gender} ${entity.firstName} ${entity.lastName}`
    }
    return `${entity.firstName} ${entity.lastName}`;
  }
  return '';
};
export const getInitials = (entity: User): string => {
  if(entity) {
    const firstName = entity.firstName;
    const lastName = entity.lastName;
    const words: string[] = [firstName, lastName];
    return words
      .filter((w) => w !== undefined)
      .map((word) => word.charAt(0))
      .join('');
  }
  return '';
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

export const generateCode = (length: number = 6): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export const convertTreatmentStatus = (status: TreatmentStatus) => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'En cours'
    case 'ON_HOLD':
      return 'En suspens'
    case "CANCELLED":
      return 'Annulé'
    case "COMPLETED":
      return 'Terminé'
  }
}

export const removeDuplicationById = <T extends { id: string }>(entity: T[]): T[] => {
  const uniqueEntities: Record<string, T> = {};

  entity.forEach(item => {
    uniqueEntities[item.id] = item;
  });

  return Object.values(uniqueEntities);
};

export const getViewBounds = (viewType: View, date: Date) => {
  let start: Date;
  let end: Date;
  const [year, month, day] = date.toISOString().split('T')[0].split('-').map(Number);
  switch (viewType) {
    case 'Day':
      start = new Date(Date.UTC(year, month-1, day, 0, 0,0));
      end = new Date(Date.UTC(year, month-1, day, 23, 59,59));
      break;
    case 'WorkWeek':
      start = new Date(date);
      end = new Date(date);
      const dayOfWorkWeek = start.getDay();
      const diffT = (dayOfWorkWeek === 0 ? 6 : dayOfWorkWeek - 1);
      start = new Date(Date.UTC(year, month-1, day - diffT +1, 0, 0,0));
      end = new Date(Date.UTC(year, month-1, day + (7-diffT), 23, 59,59));
      break;
    case 'Week':
      start = new Date(date);
      end = new Date(date);
      const dayOfWeek = start.getDay();
      const diff = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
      start = new Date(Date.UTC(year, month-1, day - diff+1, 0, 0,0));
      end = new Date(Date.UTC(year, month-1, day + (7-diff), 23, 59,59));
      break;
    case 'Month':
      start = new Date(Date.UTC(year, month-1, 1, 0, 0,0));
      end = new Date(Date.UTC(year, month, 1, 0, 0,0));
      break;
    default:
      start = new Date(Date.UTC(year, month-1, 1, 0, 0,0));
      end = new Date(Date.UTC(year, month, 1, 0, 0,0));
      break;
  }

  return {
    from: start,
    to: end
  }
}