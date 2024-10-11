'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import usePatientStore from '@/stores/patient';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { FichePatient } from '@/components/dashboard/patients/fiche-components/FichePatient';

const Page = () => {

  const params = useParams();
  const id = params?.id as string;

  const selectedPatient = usePatientStore((state) => state.selectedPatient);
  const isSelectedPatientLoading = usePatientStore((state) => state.isSelectedPatientLoading);
  const getSelectedPatient = usePatientStore((state) => state.getSelectedPatient);
  const getSelectedPatientError = usePatientStore((state) => state.getSelectedPatientError);

  useEffect(() => {
    getSelectedPatient(id);
  }, [id]);

  useEffect(() => {
    console.log('selectedPatient', selectedPatient);
  }, [selectedPatient]);

  if(getSelectedPatientError !== '') {
    return <div className='w-full h-full flex justify-center items-center'>
      {getSelectedPatientError}
    </div>;
  }

  if(isSelectedPatientLoading || !selectedPatient.id) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return (
    <FichePatient />
  );
};

export default Page;