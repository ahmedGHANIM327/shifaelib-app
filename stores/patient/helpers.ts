import { Patient } from '@/lib/types/patients';
import { Treatment } from '@/lib/types/patients/treatments';

export const updatePatientProfile = (currentPatient:Patient, updatedPatient:Patient): Patient => {
  if(currentPatient.id === updatedPatient.id) {
    return {
      ...currentPatient,
      ...updatedPatient
    }
  }
  return currentPatient;

}

export const selectedPatientEntities = (p:Patient) => {
  const {
    treatments,
    ...patient
  } = p;

  return {
    treatments: (treatments || []) as Treatment[],
    patient: patient as Patient
  }
}