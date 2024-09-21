'use client';

import React, { useEffect } from 'react';
import useCabinetStore from '@/stores/cabinet';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { UpdateCabinetForm } from '@/components/dashboard/cabinet/forms/UpdateCabinetForm';
import { Card } from '@/components/ui/card';
import { FicheCabinetHeader } from '@/components/dashboard/cabinet/components/FicheCabinetHeader';

const Page = () => {
  const currentCabinet = useCabinetStore((state) => state.currentCabinet);
  const getCurrentCabinet = useCabinetStore((state) => state.getCurrentCabinet);
  const isCurrentCabinetLoading = useCabinetStore((state) => state.isCurrentCabinetLoading);

  useEffect(() => {
    getCurrentCabinet();
  }, []);

  if(isCurrentCabinetLoading || !currentCabinet.id) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return <Card>
    <FicheCabinetHeader
      logo={currentCabinet.logo}
    />
    <UpdateCabinetForm />
  </Card>;
};

export default Page;
