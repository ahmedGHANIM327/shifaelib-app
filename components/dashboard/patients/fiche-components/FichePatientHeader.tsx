import React from 'react';
import { getFullName } from '@/lib/utils';
import { CreateOrUpdatePatientForm } from '@/components/dashboard/patients/forms/CreateOrUpdatePatientForm';
import { DeletePatient } from '@/components/dashboard/patients/components/DeletePatient';
import usePatientStore from '@/stores/patient';

export const FichePatientHeader = () => {

  const patient = usePatientStore((state) => state.selectedPatient);

  return (
    <div className={'text-center py-2 rounded-t-md relative bg-primary text-white'}>
      {getFullName(patient, true)}
      <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
        <CreateOrUpdatePatientForm type={'update'} patient={patient} iconeClassName={'text-white'} />
        <DeletePatient patient={patient} iconeClassName={'text-white'} isFiche={true}/>
      </div>
    </div>
  );
};