import React, { FC } from 'react';
import { getFullName } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { Patient } from '@/lib/types/patients';
import { CreateOrUpdatePatientForm } from '@/components/dashboard/patients/forms/CreateOrUpdatePatientForm';
import { DeletePatient } from '@/components/dashboard/patients/components/DeletePatient';
import { User } from '@/lib/types/users';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';

export const PatientCard:FC<{patient:Patient}> = ({patient}) => {
  return (
    <Card>
      <div className={'text-center py-2 rounded-t-md relative bg-primary text-white'}>
        {getFullName(patient, true)}
        <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
          <CreateOrUpdatePatientForm type={'update'} patient={patient} iconeClassName={'text-white'}/>
          <DeletePatient patient={patient} iconeClassName={'text-white'}/>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-y-2 gap-x-4 flex-wrap text-sm pb-1">
        <div className="flex gap-x-4">
          <p className="font-semibold">Date de naissance</p>
          <p>{patient.birthDate}</p>
        </div>
        <div className="flex gap-x-4">
          <p className="font-semibold">Adresse</p>
          <p>{patient.address || '-'}</p>
        </div>
        <div className="flex gap-x-4">
          <p className="font-semibold">Email</p>
          <p>{patient.email || '-'}</p>
        </div>
        <div className="flex gap-x-4">
          <p className="font-semibold">Téléphone</p>
          <p>{patient.phone || '-'}</p>
        </div>
      </div>
      <div className="flex-col flex items-end p-2 gap-y-2">
        <p className="text-xs">
          Crée le {patient.createdAt && format(new Date(patient.createdAt), "dd LLL y", { locale: fr })} par <UserHoverCard user={patient.createdByUser as User} triggerClassName={'py-0 text-xs my-0 h-fit'}/>
        </p>
        <p className='text-xs'>
          Mis à jour le {patient.updatedAt && format(new Date(patient.updatedAt), "dd LLL y", { locale: fr })} par <UserHoverCard user={patient.updatedByUser as User} triggerClassName={'py-0 text-xs my-0 h-fit'}/>
        </p>
      </div>
    </Card>
  );
};