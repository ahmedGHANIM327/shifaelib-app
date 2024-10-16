import { CalendarSession, Session, SessionStatus } from '@/lib/types/patients/sessions';
import { WeekOpeningHours } from '@/lib/types';
import { convertDateUTC } from '@/lib/utils';

export const createCalendarSessions = (sessions: Session[]): CalendarSession[] => {
  return sessions.map((session: Session) => ({
    Id: session.id,
    StartTime: session.startTime,
    EndTime: session.endTime,
    Status: session.status,
    Tarif: session.tarif,
    Note: session.note,
    Treatment: session.treatment
  }))
};

export const getDaySchedule = (dayIndex: number, openingHours: WeekOpeningHours): { from: string | null; to: string | null } => {
  const dayIndexes: { [key in keyof WeekOpeningHours]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const dayName = (Object.keys(dayIndexes) as (keyof WeekOpeningHours)[]).find(day => dayIndexes[day] === dayIndex);

  if (dayName && !openingHours[dayName].isClosed) {
    return {
      from: openingHours[dayName]?.from || null,
      to: openingHours[dayName]?.to || null,
    };
  }

  return { from: null, to: null };
};

export const getWorkingDays = (openingHours: WeekOpeningHours): number[] => {
  const dayIndexes: { [key in keyof WeekOpeningHours]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  return (Object.keys(openingHours) as (keyof WeekOpeningHours)[])
    .filter(day => !openingHours[day].isClosed)
    .map(day => dayIndexes[day]);
};

export const convertSessionStatus = (status: SessionStatus, lower: boolean = false) => {
  switch (status) {
    case 'SCHEDULED':
      return 'Programmée'
    case 'ATTENDED':
      return 'Assistée'
    case "NOT_ATTENDED":
      return 'Non assistée'
    case "CANCELED":
      return 'Annulée'
  }
}