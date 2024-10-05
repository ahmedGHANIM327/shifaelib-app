import { create } from 'zustand';
import { PatientListingFilters } from '@/lib/types/patients';

interface PatientState {
  reloadListingPatients: boolean;
  setReloadPatients: (e: boolean)=>void;
  ///////////
  listingFilters; PatientListingFilters;
  setListingFilters: (filters: PatientListingFilters) => void;
  resetFilters: boolean;
  setResetFilters: () => void;
}

const usePatientStore = create<PatientState>((set, get) => ({
  reloadListingPatients: true,
  setReloadPatients: (e: boolean) => {
    set({ reloadListingPatients: e });
  },
  listingFilters: {
    search: '',
    sort: 'creation_date_desc',
    gender: 'ALL',
    createdBy: []
  },
  setListingFilters: (newFilters: PatientListingFilters) => {
    set({ listingFilters: newFilters });
  },
  resetFilters: true,
  setResetFilters: () => {
    const currentResetFilters = get().resetFilters;
    set({ resetFilters: !currentResetFilters });
    set({listingFilters: {
        search: '',
        sort: 'creation_date_desc',
        gender: 'ALL',
        createdBy: []
      }});
  }
}));

export default usePatientStore;
