import { create } from 'zustand';
import {
  TreatmentStateAction,
  TreatmentStateActionType
} from '@/lib/types/patients/treatments';

interface TreatmentState {
  state: TreatmentStateAction | null;
  setState: (type: TreatmentStateActionType, payload: string) => void;
  resetState: () => void;
}

const useTreatmentStore = create<TreatmentState>((set, get) => ({
  state: null,
  setState: (type:  TreatmentStateActionType, payload: string) => {
    const newState = {
      type,
      payload,
      date: new Date()
    } as TreatmentStateAction;
    set({ state: newState });
  },
  resetState: () => {
    set({ state: null });
  }
}));

export default useTreatmentStore;
