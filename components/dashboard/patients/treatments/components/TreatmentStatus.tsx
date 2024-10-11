import React, { FC } from 'react';
import { TreatmentStatus } from '@/lib/types/patients/treatments';
import { cn, convertTreatmentStatus } from '@/lib/utils';

export const TreatmentStatusComponent:FC<{status: TreatmentStatus}> = ({status}) => {

  return (<div className={cn('bg-blue-100 text-blue-800 text-center rounded-md px-5 w-fit',
      status === 'CANCELLED' && 'bg-red-100 text-red-800',
    status === 'COMPLETED' && 'bg-green-100 text-green-800',
    status === 'ON_HOLD' && 'bg-orange-100 text-orange-800'
    )}>
    {convertTreatmentStatus(status)}
  </div>);
};