import { create } from 'zustand';
import { Patient, PatientListingFilters } from '@/lib/types/patients';
import { getPatientById } from '@/server/services/patients';
import { selectedPatientEntities, updatePatientProfile } from '@/stores/patient/helpers';
import { Treatment } from '@/lib/types/patients/treatments';

interface PatientState {
  reloadListingPatients: boolean;
  setReloadPatients: (e: boolean)=>void;
  listingFilters: PatientListingFilters;
  setListingFilters: (filters: PatientListingFilters) => void;
  resetFilters: boolean;
  setResetFilters: () => void;
  // Fiche patient
  selectedPatient: Patient;
  selectedPatientTreatments: Treatment[];
  isSelectedPatientLoading: boolean;
  getSelectedPatientError: string;
  getSelectedPatient: (id: string) => Promise<void>;
  setSelectedPatient: (newPatient: Patient) => void;
  updatePatientProfile: (patient: Patient) => void;
  addPatientTreatment: (treatment: Treatment) => void;
  deletePatientTreatment: (id: string) => void;
  updatePatientTreatment: (updatedTreatment: Treatment) => void;
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
        const {
          treatments,
          patient
        } = selectedPatientEntities(response.data as Patient);
        set({ selectedPatient: patient });
        set({ selectedPatientTreatments: treatments });
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
  },
  // patient treatments
  selectedPatientTreatments: [] as Treatment[],
  addPatientTreatment: (treatment: Treatment) => {
    const currentTreatments = get().selectedPatientTreatments as Treatment[];
    set({ selectedPatientTreatments: [treatment, ...currentTreatments] });
  },
  updatePatientTreatment: (updatedTreatment: Treatment) => {
    const currentTreatments = get().selectedPatientTreatments as Treatment[];
    const filteredTreatments = currentTreatments.filter(t => t.id !== updatedTreatment.id);
    set({ selectedPatientTreatments: [updatedTreatment, ...filteredTreatments] });
  },
  deletePatientTreatment: (id: string) => {
    const currentTreatments = get().selectedPatientTreatments as Treatment[];
    const filteredTreatments = currentTreatments.filter(t => t.id !== id);
    set({ selectedPatientTreatments: filteredTreatments });
  }
}));

export default usePatientStore;
