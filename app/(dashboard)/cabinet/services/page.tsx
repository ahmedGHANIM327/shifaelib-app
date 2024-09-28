'use client';

import React, { useEffect } from 'react';
import { ServicesPageHeader } from '@/components/dashboard/services/components/ServicesPageHeader';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import useServiceStore from '@/stores/service';
import { ColumnDef, RowData } from '@tanstack/react-table';
import DataTable from '@/components/shared/components/DataTable';
import { ServicesColumns } from '@/components/dashboard/services/components/ServicesColumns';
import { PhoneCardUser } from '@/components/dashboard/user/components/PhoneCardUser';
import { ServiceCardLisiting } from '@/components/dashboard/services/components/ServiceCardLisiting';
import { UsersColumns } from '@/components/dashboard/user/components/UsersColumns';

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
        <div className='hidden md:flex'>
          <DataTable columns={ServicesColumns as ColumnDef<RowData>[]} data={services || []}
                     noDataText={`Pas d'de services`} />
        </div>
        <div className='md:hidden flex flex-col gap-4 mt-4'>
          {services.map((service, index) => (<ServiceCardLisiting service={service} key={index} />))}
        </div>
      </Card>
    </div>
  );
};

export default Page;