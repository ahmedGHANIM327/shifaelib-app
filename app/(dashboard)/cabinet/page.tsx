'use client';

import React from 'react';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Card } from '@/components/ui/card';
import { FicheCabinetHeader } from '@/components/dashboard/cabinet/components/FicheCabinetHeader';
import { FicheCabinetData } from '@/components/dashboard/cabinet/components/FicheCabinetData';
import { FicheCabinetHoraire } from '@/components/dashboard/cabinet/components/FicheCabinetHoraire';
import { DefaultOpeningHours } from '@/lib/constants';
import { WeekOpeningHours } from '@/lib/types';
import useUserStore from '@/stores/user';

const Page = () => {

  const currentCabinet = useUserStore((state) => state.currentCabinet);
  const isCurrentUserLoading = useUserStore((state) => state.isCurrentUserLoading);

  if(isCurrentUserLoading) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return <Card className='pb-4'>
    <FicheCabinetHeader
      logo={currentCabinet.logo}
    />
    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 md:mx-4 mx-2 mt-4'>
      <FicheCabinetData
        cabinet={currentCabinet}
      />
      <FicheCabinetHoraire
        openingHours={currentCabinet.openingHours as WeekOpeningHours || DefaultOpeningHours}
      />
    </div>
  </Card>;
};

export default Page;
