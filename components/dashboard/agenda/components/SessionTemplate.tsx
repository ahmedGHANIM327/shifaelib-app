import React from 'react';
import { CalendarSession } from '@/lib/types/patients/sessions';
import { View } from '@syncfusion/ej2-schedule';
import { Patient } from '@/lib/types/patients';
import { COLORS, NON_SPECIFIED_SERVICE } from '@/lib/constants';
import { cn, getFullName } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserHoverCard } from '@/components/dashboard/user/components/UserHoverCard';
import { SessionStatusComponent } from '@/components/dashboard/agenda/components/SessionStatusComponent';

export const SessionTemplate = (event: CalendarSession, view: View) => {
  const patient = event.Treatment.patient as Patient;
  const praticien = event.Treatment.responsible || null;
  const service = event.Treatment.service || NON_SPECIFIED_SERVICE;
  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const bgLightColor = COLORS.find(c => c.color === color)?.bgLightColor!;
  const textColor = COLORS.find(c => c.color === color)?.textColor!;
  const textLightColor = COLORS.find(c => c.color === color)?.textLightColor!;
  const borderColor = COLORS.find(c => c.color === color)?.borderColor!;

  if(view === 'Month') {
    return (
      <div className={cn(
        'h-full w-full',
      )}>
        <div className={`flex justify-between items-center gap-x-2 px-1 ${bgLightColor}`}>
          <p className={`text-[12px] flex items-center gap-x-2 font-bold ${textColor}`}>
            {getFullName(patient, true)}
          </p>
          <SessionStatusComponent
            status={event!.Status}
            className={'w-2 h-2'}
            onlySpan={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      `h-full w-full p-2 flex flex-col border rounded-md justify-between gap-y-4 ${bgLightColor} ${borderColor}`,
    )}>
      <div>
        <div className='flex justify-between items-center gap-x-2 mb-2 '>
          <p className={`text-[14px] font-semibold ${textColor}`}>
            {getFullName(patient, true)}
          </p>
          <SessionStatusComponent
            status={event!.Status}
            className={`bg-transparent ${textColor} p-0`}
            onlyIcon={true}
          />
        </div>
        <p
          className={`text-xs w-fit px-2 rounded-md ${bgColor} ${textLightColor}`}>
          {format(new Date(event.StartTime), "HH:mm", { locale: fr })} - {format(new Date(event.EndTime), "HH:mm", { locale: fr })}
        </p>
      </div>
      <div className='flex justify-end'>
        <UserHoverCard user={praticien} isAvatar={true} avatarClassName={`${bgColor} ${textLightColor} text-xs`}/>
      </div>
    </div>
  );
};