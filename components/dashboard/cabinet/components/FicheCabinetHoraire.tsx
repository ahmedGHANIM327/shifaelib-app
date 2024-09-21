import React, { FC } from 'react';
import { Card } from '@/components/ui/card';
import { CardTitle } from '@/components/shared/components/CardTitle';
import { Calendar } from 'lucide-react';
import { UpdateCabinetForm } from '@/components/dashboard/cabinet/forms/UpdateCabinetForm';
import { DayOpeningHoursComponent } from '@/components/dashboard/cabinet/components/DayOpeningHoursComponent';
import { WeekOpeningHours } from '@/lib/types';

type FicheCabinetHoraireProps = {
  openingHours: WeekOpeningHours;
}
export const FicheCabinetHoraire:FC<FicheCabinetHoraireProps> = ({ openingHours }) => {
  return (
    <Card className='p-2'>
      <div className='flex justify-between items-center'>
        <CardTitle
          title={'Horaires'}
          icon={<Calendar size={18} />}
          className={'mb-0'}
          h4_className={'md:text-xl'}
        />
        <UpdateCabinetForm />
      </div>
      <div className='flex gap-y-3 flex-col mt-4'>
        <DayOpeningHoursComponent
          openingHour={openingHours.monday}
          day={'Lundi'}
        />
        <DayOpeningHoursComponent
          openingHour={openingHours.tuesday}
          day={'Mardi'}
        />
        <DayOpeningHoursComponent
          openingHour={openingHours.wednesday}
          day={'Mercredi'}
        />
        <DayOpeningHoursComponent
          openingHour={openingHours.thursday}
          day={'Jeudi'}
        />
        <DayOpeningHoursComponent
          openingHour={openingHours.friday}
          day={'Vendredi'}
        />
        <DayOpeningHoursComponent
          openingHour={openingHours.saturday}
          day={'Samedi'}
        />
        <DayOpeningHoursComponent
          openingHour={openingHours.sunday}
          day={'Dimanche'}
        />
      </div>
    </Card>
  );
};