import React, {FC} from 'react';
import { DayOpeningHours } from '@/lib/types';

export const DayOpeningHoursComponent:FC<{openingHour: DayOpeningHours; day:string}> = ({openingHour, day}) => {
  return (
    <div className={'w-full flex justify-between'}>
      <p className='w-[100px]'>{day}</p>
      <p>------</p>
      <p className='w-[120px] flex justify-end'>
        {
          openingHour.isClosed ? 'Fermé' : `${openingHour.from} - ${openingHour.to}`
        }
      </p>
    </div>
  );
};