import React, { FC } from 'react';
import { Card } from '@/components/ui/card';
import { Patient } from '@/lib/types/patients';
import { FichePatientHeader } from '@/components/dashboard/patients/fiche-components/FichePatientHeader';
import { FichePatientProfile } from '@/components/dashboard/patients/fiche-components/FichePatientProfile';
import { FichePatientTreatments } from '@/components/dashboard/patients/fiche-components/FichePatientTreatments';
import { FichePatientComments } from '@/components/dashboard/patients/fiche-components/FichePatientComments';

export const FichePatient:FC<{ patient: Patient }> = ({ patient }) => {
  return (
    <Card>
      <FichePatientHeader patient={patient}/>
      <div className='m-2 p-2 flex flex-col gap-y-4'>
        <FichePatientProfile patient={patient} />
        <FichePatientTreatments />
        <FichePatientComments />
      </div>
    </Card>
  );
};