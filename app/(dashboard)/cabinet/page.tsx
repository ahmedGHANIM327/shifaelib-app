'use client';

import React, { useEffect } from 'react';
import useCabinetStore from '@/stores/cabinet';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';

const Page = () => {
  const currentCabinet = useCabinetStore((state) => state.currentCabinet);
  const getCurrentCabinet = useCabinetStore((state) => state.getCurrentCabinet);
  const isCurrentCabinetLoading = useCabinetStore((state) => state.isCurrentCabinetLoading);

  useEffect(() => {
    getCurrentCabinet();
  }, []);

  useEffect(() => {
    console.log('current cabinet', currentCabinet);
  }, [currentCabinet]);

  if(isCurrentCabinetLoading || !currentCabinet.id) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return <div>Hello from {currentCabinet.name}</div>;
};

export default Page;
