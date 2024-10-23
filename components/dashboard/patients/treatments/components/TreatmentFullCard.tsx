'use client';
import React, { FC, useEffect, useState } from 'react';
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
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateSessionProps } from '@/lib/types/patients/sessions';
import { CreateSessionForm } from '@/components/dashboard/patients/sessions/forms/CreateSessionForm';

type TreatmentFullCardProps = {
  treatment: Treatment;
  from: 'fiche_patient';
};

export const TreatmentFullCard:FC<TreatmentFullCardProps> = ({treatment, from}) => {
  const service = treatment.service || NON_SPECIFIED_SERVICE;
  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textLightColor!;

  const [openCreateSession, setOpenCreateSession] = useState<CreateSessionProps>({
    open: false,
    startTime: new Date()
  });

  return (
    <div className='border'>
      <div className={cn(bgColor, textColor, 'text-center py-2 relative')}>
        {treatment.code}
        <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
          <CreateOrUpdateTreatmentForm type={'update'} treatment={treatment} iconeClassName={textColor} />
          <DeleteTreatment treatment={treatment} iconeClassName={textColor} />
        </div>
      </div>
      <div className="grid grid-cols-3 xs:grid-cols-1 gap-y-6 gap-x-6 text-sm pb-1 bg-accent mx-2 my-2 p-2">
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
          <UserHoverCard user={treatment.responsible as User} />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">Date de création</p>
          <p>{treatment.createdAt && format(new Date(treatment.createdAt), 'dd LLL y - HH:mm', { locale: fr })}</p>
        </div>
      </div>
      <div className='mx-2 my-2'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className={'text-primary font-semibold text-lg'}>Séances</h2>
          <Button onClick={()=>setOpenCreateSession({
            ...openCreateSession,
            open: true,
            fiche: true,
            patientId: treatment.patientId,
            treatmentId: treatment.id,
          })}>
            <PlusIcon size={13}/>
          </Button>
        </div>
      </div>
      <CreateSessionForm data={openCreateSession} handleChange={setOpenCreateSession}/>
    </div>
  );
};