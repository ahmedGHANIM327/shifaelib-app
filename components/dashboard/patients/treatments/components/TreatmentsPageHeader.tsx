import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateOrUpdatePatientForm } from '@/components/dashboard/patients/forms/CreateOrUpdatePatientForm';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';

export const TreatmentsPageHeader = () => {
  return (
    <div className='my-3 max-w-full w-full grid md:grid-cols-5 grid-cols-1 md:gap-x-2 gap-y-2'>
      <div className='md:col-span-4 md:pr-12'>
        <h2 className={'md:text-4xl text-2xl font-semibold text-primary'}>
          Traitements
        </h2>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className='md:text-[17px] text-[13px] text-justify mt-2'>Bienvenue dans l'espace dédié à la
          gestion de vos traitements. Que vous souhaitiez consulter, modifier ou mettre à jour les informations,
          ce tableau centralisé vous permettra de gérer efficacement tous les aspects liés à
          vos traitements.</p>
      </div>
      <div className='h-full flex gap-x-1 items-center w-full'>
        <CreateOrUpdateTreatmentForm />
      </div>
    </div>
  );
};