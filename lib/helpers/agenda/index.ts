import { CalendarSession, Session } from '@/lib/types/patients/sessions';

export const createCalendarSessions = (sessions: Session[]): CalendarSession[] => {

  return sessions.map((session: Session) => ({
    Id: session.id,
    StartTime: session.startTime,
    EndTime: session.endTime,
    Status: session.status
  }))
}