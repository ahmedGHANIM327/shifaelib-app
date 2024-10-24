import { create } from 'zustand';
import { Payment, PaymentStateAction, PaymentStateActionType } from '@/lib/types/patients/paiments';

interface PaymentState {
  state: PaymentStateAction | null;
  setState: (type: PaymentStateActionType, payload: Payment | string) => void;
  resetState: () => void;
}

const usePaymentStore = create<PaymentState>((set, get) => ({
  state: null,
  setState: (type:  PaymentStateActionType, payload: Payment | string) => {
    const newState = {
      type,
      payload,
      date: new Date()
    } as PaymentStateAction;
    set({ state: newState });
  },
  resetState: () => {
    set({ state: null });
  }
}));

export default usePaymentStore;
