export type ServerResponse<T = any> = {
  ok: boolean;
  error?: string;
  data?: T;
};

export type AccountStatus = 'ACTIF' | 'INACTIF' | 'BLOCKED' | 'DELETED';

export type Gender = 'M' | 'F';

type DayOpeningHours = {
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
}
