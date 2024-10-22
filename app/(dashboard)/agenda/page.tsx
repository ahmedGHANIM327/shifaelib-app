'use client';
import React, { useState } from 'react';
import { AgendaComponent } from '@/components/shared/components/AgendaComponent';
import { AgendaFilters } from '@/lib/types/patients/sessions';
import { FullAgendaFilters } from '@/components/dashboard/agenda/components/FullAgendaFilters';

const Page = () => {

  const [filters, setFilters] = useState<AgendaFilters>({
    patients: [],
    praticiens: [],
    services: [],
    status: []
  });

  return (
    <div className={'rounded-none absolute top-0 left-0 h-[100vh] overflow-y-auto grid md:grid-cols-6 col-span1 gap-0'}>
      <FullAgendaFilters
        filters={filters}
        setFilters={setFilters}
        containerClassName={'md:col-span-1'}
      />
      <AgendaComponent
        filters={filters}
        views={['Day', 'WorkWeek', 'Week', 'Month']}
        height={'95vh'}
        containerClassName={'md:col-span-5 col-span-1'}
      />
    </div>
  );
};

export default Page;