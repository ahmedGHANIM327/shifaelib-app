import { create } from 'zustand';
import { Patient, PatientListingFilters } from '@/lib/types/patients';
import { User } from '@/lib/types/users';
import { transformCurrentUser } from '@/lib/helpers/users';
import { getCurrentUser } from '@/server/services/users';
import { signOut } from 'next-auth/react';
import { getPatientById } from '@/server/services/patients';
import { updatePatientProfile } from '@/stores/patient/helpers';

interface PatientState {
  reloadListingPatients: boolean;
  setReloadPatients: (e: boolean)=>void;
  listingFilters: PatientListingFilters;
  setListingFilters: (filters: PatientListingFilters) => void;
  resetFilters: boolean;
  setResetFilters: () => void;
  // Fiche patient
  selectedPatient: Patient;
  isSelectedPatientLoading: boolean;
  getSelectedPatientError: string;
  getSelectedPatient: (id: string) => Promise<void>;
  setSelectedPatient: (newPatient: Patient) => void;
  updatePatientProfile: (patient: Patient) => void;
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
  } as PatientListingFilters,
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
  },
  // Fiche patient
  selectedPatient: {} as Patient,
  isSelectedPatientLoading: true,
  getSelectedPatientError: '',
  setSelectedPatient: (newPatient: Patient) => {
    set({ selectedPatient: newPatient });
  },
  getSelectedPatient: async (id: string) => {
    const selectedPatient = get().selectedPatient as Patient;
    if(selectedPatient.id !== id) {
      set({ isSelectedPatientLoading: true });
      set({ getSelectedPatientError: '' });
      const response = await getPatientById(id);
      if (response.ok) {
        set({ selectedPatient: response.data as Patient });
      } else {
        set({ getSelectedPatientError: response.error });
      }
    }
    set({ isSelectedPatientLoading: false });
  },
  updatePatientProfile: (updatedPatient: Patient) => {
    const currentPatient = get().selectedPatient as Patient;
    const updatedSelectedPatient = updatePatientProfile(currentPatient, updatedPatient);
    set({ selectedPatient: updatedSelectedPatient});
  }
}));

export default usePatientStore;
