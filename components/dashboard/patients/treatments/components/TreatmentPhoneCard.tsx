'use client';

import React, { FC } from 'react';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';
import { DeleteTreatment } from '@/components/dashboard/patients/treatments/components/DeleteTreatment';
import { Treatment } from '@/lib/types/patients/treatments';
import { Card } from '@/components/ui/card';
import { COLORS, NON_SPECIFIED_SERVICE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TreatmentStatusComponent } from '@/components/dashboard/patients/treatments/components/TreatmentStatus';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { TreatmentAdditionalData } from '@/components/dashboard/patients/treatments/components/TreatmentAdditionalData';
import { ServiceHoverCard } from '@/components/dashboard/services/components/ServiceHoverCard';
import { Patient } from '@/lib/types/patients';
import { PatientHoverCard } from '@/components/dashboard/patients/components/PatientHoverCard';
import { User } from '@/lib/types/users';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type TreatmentPhoneCardProps = {
  treatment: Treatment;
};

export const TreatmentPhoneCard:FC<TreatmentPhoneCardProps> = ({ treatment }) => {
  const service = treatment.service || NON_SPECIFIED_SERVICE;
  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textLightColor!;
  return (
    <Card>
      <div className={cn(bgColor, textColor, 'text-center py-2 rounded-t-md relative')}>
        {treatment.code}
        <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
          <CreateOrUpdateTreatmentForm type={'update'} treatment={treatment} iconeClassName={textColor} />
          <DeleteTreatment treatment={treatment} iconeClassName={textColor} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-y-4 gap-x-6 text-sm pb-1">
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Nombre de séances</p>
          <p>{treatment.nbSessions}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Statut</p>
          <TreatmentStatusComponent status={treatment.status} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Données supp.</p>
          <TreatmentAdditionalData data={treatment.data as AdditionalQuestionType[]} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Service</p>
          <ServiceHoverCard service={treatment.service as Service} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Patient</p>
          <PatientHoverCard patient={treatment.patient as Patient} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Praticien</p>
          <UserHoverCard user={treatment.responsible as User}/>
        </div>
      </div>
      {<div className="flex-col flex items-end p-2 gap-y-2">
        <p className="text-xs">
          Crée le {treatment.createdAt && format(new Date(treatment.createdAt), "dd LLL y", { locale: fr })} par <UserHoverCard user={treatment.createdByUser as User} triggerClassName={'py-0 text-xs my-0 h-fit'}/>
        </p>
        <p className='text-xs'>
          Mis à jour le {treatment.updatedAt && format(new Date(treatment.updatedAt), "dd LLL y", { locale: fr })} par <UserHoverCard user={treatment.updatedByUser as User} triggerClassName={'py-0 text-xs my-0 h-fit'}/>
        </p>
      </div>}
    </Card>
  )
    ;
};
