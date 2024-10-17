'use client';
import React, { useEffect, useState } from 'react';
import { AgendaComponent } from '@/components/shared/components/AgendaComponent';
import { AgendaFilters } from '@/lib/types/patients/sessions';
import { ServicesMultiSelectInput } from '@/components/shared/inputs/ServicesMultiSelectInput';
import { Service } from '@/lib/types/services';
import { FullAgendaFilters } from '@/components/dashboard/agenda/components/FullAgendaFilters';

const Page = () => {

  const [filters, setFilters] = useState<AgendaFilters>({
    patients: [],
    praticiens: [],
    services: [],
    status: []
  });

  return (
    <div className={'rounded-none absolute top-0 left-0 h-[100vh] grid grid-cols-6'}>
      <FullAgendaFilters
        filters={filters}
        setFilters={setFilters}
        containerClassName={'col-span-1'}
      />
      <AgendaComponent
        filters={filters}
        views={['Day', 'WorkWeek', 'Week', 'Month']}
        height={'95vh'}
        containerClassName={'md:col-span-5 col-span-6'}
      />
    </div>
  );
};

export default Page;