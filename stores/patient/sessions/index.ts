import { create } from 'zustand';
import { CalendarSession, Session, SessionStateAction, SessionStateActionType } from '@/lib/types/patients/sessions';

type ViewAgendaSessionProps = {
  open: boolean;
  type: 'view' | 'update' | 'delete';
  data: Session;
}

interface SessionState {
  state: SessionStateAction | null;
  setState: (type: SessionStateActionType, payload: Session | string) => void;
  resetState: () => void;
  viewAgendaSession: ViewAgendaSessionProps;
  setViewAgendaSession: (type: ViewAgendaSessionProps) => void;
}

const useSessionStore = create<SessionState>((set, get) => ({
  state: null,
  setState: (type:  SessionStateActionType, payload: Session | string) => {
    const newState = {
      type,
      payload,
      date: new Date()
    } as SessionStateAction;
    set({ state: newState });
  },
  resetState: () => {
    set({ state: null });
  },
  viewAgendaSession: {
    open: false,
    type: 'view',
    data: {} as Session
  },
  setViewAgendaSession: (newViewSessionState:  ViewAgendaSessionProps) => {
    set({ viewAgendaSession: newViewSessionState });
  },
}));

export default useSessionStore;
