'use client';
import React, { FC, useEffect } from 'react';
import { COLORS, NON_SPECIFIED_SERVICE } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  CreateOrUpdateTreatmentForm
} from '@/components/dashboard/patients/treatments/forms/CreateOrUpdateTreatmentForm';
import { DeleteTreatment } from '@/components/dashboard/patients/treatments/components/DeleteTreatment';
import { TreatmentStatusComponent } from '@/components/dashboard/patients/treatments/components/TreatmentStatus';
import { TreatmentAdditionalData } from '@/components/dashboard/patients/treatments/components/TreatmentAdditionalData';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { ServiceHoverCard } from '@/components/dashboard/services/components/ServiceHoverCard';
import { PatientHoverCard } from '@/components/dashboard/patients/components/PatientHoverCard';
import { Patient } from '@/lib/types/patients';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { User } from '@/lib/types/users';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Treatment } from '@/lib/types/patients/treatments';

type TreatmentFullCardProps = {
  treatment: Treatment;
  from: 'fiche_patient';
};

export const TreatmentFullCard:FC<TreatmentFullCardProps> = ({treatment, from}) => {
  const service = treatment.service || NON_SPECIFIED_SERVICE;
  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textLightColor!;
  return (
    <div className='border'>
      <div className={cn(bgColor, textColor, 'text-center py-2 relative')}>
        {treatment.code}
        <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
          <CreateOrUpdateTreatmentForm type={'update'} treatmment={treatment} iconeClassName={textColor} />
          <DeleteTreatment treatment={treatment} iconeClassName={textColor} />
        </div>
      </div>
      <div className="grid grid-cols-3 xs:grid-cols-1 p-4 gap-y-4 gap-x-6 text-sm pb-1">
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
        {from !== 'fiche_patient' && <div className="flex flex-col justify-between">
          <p className="font-semibold">Patient</p>
          <PatientHoverCard patient={treatment.patient as Patient} />
        </div>}
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
    </div>
  );
};