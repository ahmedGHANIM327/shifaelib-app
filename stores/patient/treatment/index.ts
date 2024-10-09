import { create } from 'zustand';
import { TreatmentListingFilters } from '@/lib/types/patients/treatments';

interface TreatmentState {
  reloadListingTreatments: boolean;
  setReloadTreatments: (e: boolean)=>void;
  listingFilters: TreatmentListingFilters;
  setListingFilters: (filters: TreatmentListingFilters) => void;
  resetFilters: boolean;
  setResetFilters: () => void;
}

const useTreatmentStore = create<TreatmentState>((set, get) => ({
  reloadListingTreatments: true,
  setReloadTreatments: (e: boolean) => {
    set({ reloadListingTreatments: e });
  },
  listingFilters: {
    patient: [],
    responsible: [],
    service: [],
    sort: 'creation_date_desc',
    search: '',
    status: 'ALL'
  } as TreatmentListingFilters,
  setListingFilters: (newFilters: TreatmentListingFilters) => {
    set({ listingFilters: newFilters });
  },
  resetFilters: true,
  setResetFilters: () => {
    const currentResetFilters = get().resetFilters;
    set({ resetFilters: !currentResetFilters });
    set({listingFilters: {
        patient: [],
        responsible: [],
        service: [],
        sort: 'creation_date_desc',
        search: '',
        status: 'ALL'
      }});
  }
}));

export default useTreatmentStore;
