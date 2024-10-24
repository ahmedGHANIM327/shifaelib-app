import React, { FC } from 'react';
import { getFullName } from '@/lib/utils';
import { CreateOrUpdatePatientForm } from '@/components/dashboard/patients/forms/CreateOrUpdatePatientForm';
import { DeletePatient } from '@/components/dashboard/patients/components/DeletePatient';
import { Patient } from '@/lib/types/patients';
import { InfoBlock } from '@/components/shared/components/InfoBlock';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { User } from '@/lib/types/users';

export const FichePatientHeader:FC<{ patient: Patient }> = ({ patient }) => {

  return (
    <div>
      <div className={'text-center py-2 rounded-t-md relative bg-primary text-white'}>
        {getFullName(patient, true)}
        <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
          <CreateOrUpdatePatientForm type={'update'} patient={patient} iconeClassName={'text-white'} />
          <DeletePatient patient={patient} iconeClassName={'text-white'} isFiche={true} />
        </div>
      </div>
      <div className='m-2 p-2 flex flex-col gap-y-4'>
        <div className='flex flex-wrap gap-x-2 justify-between border p-3'>
          <InfoBlock
            label={'Date de naissance'}
            value={patient.birthDate}
          />
          <InfoBlock
            label={'Adresse'}
            value={patient.address || '-'}
          />
          <InfoBlock
            label={'Adresse email'}
            value={patient?.email || '-'}
          />
          <InfoBlock
            label={'Numèro de téléphone'}
            value={patient?.phone || '-'}
          />
        </div>
        <div className="flex-col flex items-end gap-y-2 mt-2">
          <p className="text-xs">
            Crée
            le {patient.createdAt && format(new Date(patient.createdAt), "dd LLL y - HH:mm", { locale: fr })} par <UserHoverCard
            user={patient.createdByUser as User} triggerClassName={'py-0 text-xs my-0 h-fit'} />
          </p>
          <p className='text-xs'>
            Mis à jour
            le {patient.updatedAt && format(new Date(patient.updatedAt), "dd LLL y - HH:mm", { locale: fr })} par <UserHoverCard
            user={patient.updatedByUser as User} triggerClassName={'py-0 text-xs my-0 h-fit'} />
          </p>
        </div>
      </div>
    </div>
  );
};