import { Patient } from '@/lib/types/patients';

export const updatePatientProfile = (currentPatient:Patient, updatedPatient:Patient): Patient => {
  return {
    ...currentPatient,
    ...updatedPatient
  }
}