'use client';

import React, { useEffect, useState } from 'react';
import { PatientsPageHeader } from '@/components/dashboard/patients/components/PatientsPageHeader';
import { Card } from '@/components/ui/card';
import { PatientsFiltres } from '@/components/dashboard/patients/components/PatientsFiltres';
import { PatientListingFilters, PatientListingPagination } from '@/lib/types/patients';
import { PatientsData } from '@/components/dashboard/patients/components/PatientsData';
import { PatientsPagination } from '@/components/dashboard/patients/components/PatientsPagination';

const Page = () => {

  const [nbPages, setNbPages] = useState(10);

  const [filters, setFilters] = useState<PatientListingFilters>({
    search: '',
    sort: 'creation_date_desc',
    gender: 'ALL',
    createdBy: []
  });

  const [pagination, setPagination] = useState<PatientListingPagination>({
    page: 1,
    nbItemPerPage: 10
  });

  useEffect(() => {
    console.log('pagination', pagination);
    console.log('filters', filters);
  }, [pagination, filters]);

  return <div>
    <PatientsPageHeader />
    <Card className='p-4 min-h-[500px]'>
      <PatientsFiltres
        filters={filters}
        setFilters={setFilters}
      />
      <PatientsData />
      <PatientsPagination
        pagination={pagination}
        setPagination={setPagination}
        nbPages={nbPages}
      />
    </Card>
  </div>;
};

export default Page;