import React, { FC } from 'react';
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn, getFullName } from '@/lib/utils';
import { Patient } from '@/lib/types/patients';
import Link from 'next/link';

export const PatientHoverCard:FC<{ patient: Patient|null; triggerClassName?: string }> = ({ patient, triggerClassName }) => {

  if(!patient) {
    return '-';
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className={cn('px-0 w-fit underline text-foreground', triggerClassName)}>{getFullName(patient, true)}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 pb-2">
        <div className={'text-center py-2 rounded-t-md relative bg-primary text-white'}>
          <Link href={`/patients/${patient.id}`} className={'underline'}>{getFullName(patient, true)}</Link>
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
      </HoverCardContent>
    </HoverCard>
  );
};