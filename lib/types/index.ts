import { ReactElement } from 'react';

export type ServerResponse<T = any> = {
  ok: boolean;
  error?: string;
  data?: T;
};

export type PaginatedServerData<T = any> = {
  data: T;
  nbPages: number;
};

export type UserStatus = 'ACTIF' | 'BLOCKED';
export type CabinetStatus = 'ACTIF' | 'INACTIF' | 'BLOCKED' | 'DELETED';

export type Gender = 'M' | 'F';

export type DayOpeningHours = {
  from?: string;
  to?: string;
  isClosed: boolean;
};

export type WeekOpeningHours = {
  monday: DayOpeningHours;
  tuesday: DayOpeningHours;
  wednesday: DayOpeningHours;
  thursday: DayOpeningHours;
  friday: DayOpeningHours;
  saturday: DayOpeningHours;
  sunday: DayOpeningHours;
};

export type PasswordValidationResult = {
  isValidLength: boolean;
  isNotEmail: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSpecialChar: boolean;
};

export interface NavItem {
  title: string
  href: string
  icon?: ReactElement<any, any>
  isOwnerItem: boolean
}

export type selectOptionsType = {
  label: string;
  value: string;
}

export type ListingPagination = {
  page: number;
  nbItemPerPage: number;
  changed: boolean;
}
