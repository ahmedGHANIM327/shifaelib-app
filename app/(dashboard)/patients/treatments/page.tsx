'use client';

import React from 'react';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';
import { ServicesSelectInput } from '@/components/shared/inputs/ServicesSelectInput';

const Page = () => {
  return (
    <div className='max-w-[550px]'>
      <CreateOrUpdateTreatmentForm />
      <ServicesSelectInput handleChange={()=>console.log('hh')} />
    </div>
  );
};

export default Page;