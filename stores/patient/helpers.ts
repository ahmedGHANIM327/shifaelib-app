import { Patient } from '@/lib/types/patients';

export const updatePatientProfile = (currentPatient:Patient, updatedPatient:Patient): Patient => {
  if(currentPatient.id === updatedPatient.id) {
    return {
      ...currentPatient,
      ...updatedPatient
    }
  }
  return currentPatient;

}