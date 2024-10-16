import { create } from 'zustand';
import { SessionStateAction, SessionStateActionType } from '@/lib/types/patients/sessions';

interface SessionState {
  state: SessionStateAction | null;
  setState: (type: SessionStateActionType, payload: string) => void;
  resetState: () => void;
}

const useSessionStore = create<SessionState>((set, get) => ({
  state: null,
  setState: (type:  SessionStateActionType, payload: string) => {
    const newState = {
      type,
      payload,
      date: new Date()
    } as SessionStateAction;
    set({ state: newState });
  },
  resetState: () => {
    set({ state: null });
  }
}));

export default useSessionStore;
