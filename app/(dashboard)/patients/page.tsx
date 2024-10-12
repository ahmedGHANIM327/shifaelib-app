'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { PatientsPageHeader } from '@/components/dashboard/patients/components/PatientsPageHeader';
import { Card } from '@/components/ui/card';
import { PatientsFiltres } from '@/components/dashboard/patients/components/PatientsFiltres';
import {
  Patient, PatientListingFilters,
  PatientListingPagination
} from '@/lib/types/patients';
import { PatientsData } from '@/components/dashboard/patients/components/PatientsData';
import { getFilteredPatients } from '@/server/services/patients';
import { toast } from 'react-toastify';
import usePatientStore from '@/stores/patient';
import { ListingPaginationComponent } from '@/components/shared/components/ListingPagination';

const Page = () => {
  const patientState = usePatientStore((state) => state.state);
  const resetPatientState = usePatientStore((state) => state.resetState);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [nbPages, setNbPages] = useState<number>(1);

  const [filters, setFilters] = useState<PatientListingFilters>({
    search: '',
    sort: 'creation_date_desc',
    gender: 'ALL',
    createdBy: []
  });
  const [pagination, setPagination] = useState<PatientListingPagination>({
    page: 1,
    nbItemPerPage: 10,
    changed: true
  });

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getFilteredPatients(filters, pagination);
        if(response.ok && response?.data) {
          setPatients(response.data.data);
          setNbPages(response.data.nbPages);
        } else {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  }, [pagination]);

  useEffect(() => {
    setPagination({
      ...pagination,
      page: 1,
      changed: !pagination.changed
    });
  }, [filters]);

  useEffect(() => {
    if(patientState && patientState.type !== 'PATIENT_CREATED') {
      setPagination({
        ...pagination,
        page: 1,
        changed: !pagination.changed
      });
      // do action
      resetPatientState();
    }
  }, [patientState]);

  return <div>
    <PatientsPageHeader />
    <Card className='p-4 min-h-[500px]'>
      <PatientsFiltres
        filters={filters}
        setFilters={setFilters}
      />
      <PatientsData
        patients={patients}
        isLoading={isLoading}
      />
      <ListingPaginationComponent
        pagination={pagination}
        setPagination={setPagination}
        nbPages={nbPages}
      />
    </Card>
  </div>;
};

export default Page;