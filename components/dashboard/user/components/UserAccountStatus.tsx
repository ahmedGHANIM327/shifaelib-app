import React, { FC } from 'react';
import { UserStatus } from '@/lib/types';

export const UserAccountStatus:FC<{status: UserStatus}> = ({status}) => {
  if(status === 'ACTIF') {
    return (
      <p className={'bg-green-50 text-green-600 border-green-600 text-sm w-fit rounded-md font-mono flex items-center gap-x-2 px-4 border'}>
        <span className='w-2 h-2 bg-green-600 rounded-full'></span>
        actif
      </p>
    );
  }

  return (
    <p className={'bg-red-50 text-red-700 border-red-700 text-sm w-fit rounded-md font-mono flex items-center gap-x-2 px-4 border'}>
      <span className='w-2 h-2 bg-red-700 rounded-full'></span>
      bloqué
    </p>
  );
};