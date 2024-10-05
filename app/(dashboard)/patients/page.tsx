'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { PatientsPageHeader } from '@/components/dashboard/patients/components/PatientsPageHeader';
import { Card } from '@/components/ui/card';
import { PatientsFiltres } from '@/components/dashboard/patients/components/PatientsFiltres';
import {
  Patient,
  PatientListingPagination
} from '@/lib/types/patients';
import { PatientsData } from '@/components/dashboard/patients/components/PatientsData';
import { PatientsPagination } from '@/components/dashboard/patients/components/PatientsPagination';
import { getFilteredPatients } from '@/server/services/patients';
import { toast } from 'react-toastify';
import usePatientStore from '@/stores/patient';

const Page = () => {

  const setReloadPatients = usePatientStore((state) => state.setReloadPatients);
  const reloadListingPatients = usePatientStore((state) => state.reloadListingPatients);
  const filters = usePatientStore((state) => state.listingFilters);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [nbPages, setNbPages] = useState<number>(1);

  const [pagination, setPagination] = useState<PatientListingPagination>({
    page: 1,
    nbItemPerPage: 10,
    changed: true
  });

  useEffect(() => {
    if(reloadListingPatients) {
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
        } finally {
          setReloadPatients(false);
        }
      });
    }
  }, [reloadListingPatients]);

  useEffect(() => {
    setReloadPatients(true);
  }, [pagination]);

  useEffect(() => {
    setPagination({
      ...pagination,
      page: 1,
      changed: !pagination.changed
    })
  }, [filters]);

  return <div>
    <PatientsPageHeader />
    <Card className='p-4 min-h-[500px]'>
      <PatientsFiltres />
      <PatientsData
        patients={patients}
        isLoading={isLoading}
      />
      <PatientsPagination
        pagination={pagination}
        setPagination={setPagination}
        nbPages={nbPages}
      />
    </Card>
  </div>;
};

export default Page;