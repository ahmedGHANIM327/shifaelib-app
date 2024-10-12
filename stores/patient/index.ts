import { create } from 'zustand';
import { PatientStateAction, PatientStateActionType } from '@/lib/types/patients';

interface PatientState {
  state: PatientStateAction | null;
  setState: (type: PatientStateActionType, payload: string) => void;
  resetState: () => void;
}

const usePatientStore = create<PatientState>((set, get) => ({
  state: null,
  setState: (type:  PatientStateActionType, payload: string) => {
    const newState = {
      type,
      payload,
      date: new Date()
    } as PatientStateAction;
    set({ state: newState });
  },
  resetState: () => {
    set({ state: null });
  }
}));

export default usePatientStore;
