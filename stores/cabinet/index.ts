import { create } from 'zustand';
import { signOut } from 'next-auth/react';
import { Cabinet } from '@/lib/types/cabinet';
import { getCurrentCabinet } from '@/server/services/cabinet';

interface cabinetState {
  currentCabinet: Cabinet;
  isCurrentCabinetLoading: boolean;
  getCurrentCabinet: () => Promise<void>;
  setCurrentCabinet: (newCabinetData: Cabinet) => void;
}

const useCabinetStore = create<cabinetState>((set, get) => ({
  getCurrentCabinet: async () => {
    set({ isCurrentCabinetLoading: true });
    const currentCabinet = get().currentCabinet as Cabinet;
    if (!currentCabinet.id) {
      const response = await getCurrentCabinet();
      if (response.ok) {
        set({ currentCabinet: response.data });
      } else {
        await signOut();
        set({ currentCabinet: response.data });
      }
    } else {
      set({ currentCabinet: currentCabinet });
    }
    set({ isCurrentCabinetLoading: false });
  },
  setCurrentCabinet: (newCabinetData: Cabinet) => {
    set({ currentCabinet: newCabinetData });
  },
  currentCabinet: {} as Cabinet,
  isCurrentCabinetLoading: false,
}));

export default useCabinetStore;