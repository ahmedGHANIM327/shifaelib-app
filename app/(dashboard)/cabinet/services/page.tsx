'use client';

import React, { useEffect } from 'react';
import { ServicesPageHeader } from '@/components/dashboard/services/components/ServicesPageHeader';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import useServiceStore from '@/stores/service';
import { ColumnDef, RowData } from '@tanstack/react-table';
import DataTable from '@/components/shared/components/DataTable';
import { ServicesColumns } from '@/components/dashboard/services/components/ServicesColumns';

const Page = () => {

  const services = useServiceStore((state) => state.services);
  const getCurrentCabinet = useServiceStore((state) => state.getServices);
  const isServicesLoading = useServiceStore((state) => state.isServicesLoading);

  useEffect(() => {
    getCurrentCabinet();
  }, []);

  if(isServicesLoading) {
    return <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={55} className='text-primary'/>
    </div>;
  }

  return (
    <div>
      <ServicesPageHeader />
      <Card className='p-4 min-h-[500px]'>
        <DataTable columns={ServicesColumns as ColumnDef<RowData>[]} data={services || []} noDataText={`Pas d'de services`}/>
      </Card>
    </div>
  );
};

export default Page;