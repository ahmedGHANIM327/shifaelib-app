'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { TreatmentsPageHeader } from '@/components/dashboard/patients/treatments/components/TreatmentsPageHeader';
import { Card } from '@/components/ui/card';
import { TreatmentsFiltres } from '@/components/dashboard/patients/treatments/components/TreatmentsFilters';
import { ListingPagination } from '@/lib/types';
import { ListingPaginationComponent } from '@/components/shared/components/ListingPagination';
import { toast } from 'react-toastify';
import { getFilteredTreatments } from '@/server/services/patients/treatments';
import { Treatment, TreatmentListingFilters } from '@/lib/types/patients/treatments';
import { TreatmentsData } from '@/components/dashboard/patients/treatments/components/TreatmentData';
import useTreatmentStore from '@/stores/patient/treatment';

const Page = () => {

  const treatmentState = useTreatmentStore((state) => state.state);
  const resetTreatmentState = useTreatmentStore((state) => state.resetState);

  const [filters, setFilters] = useState<TreatmentListingFilters>({
    patient: [],
    responsible: [],
    service: [],
    sort: 'creation_date_desc',
    search: '',
    status: 'ALL'
  });
  const [pagination, setPagination] = useState<ListingPagination>({
    page: 1,
    nbItemPerPage: 10,
    changed: true
  });
  const [isLoading, startTransition] = useTransition();
  const [nbPages, setNbPages] = useState<number>(1);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getFilteredTreatments(filters, pagination);
        if(response.ok && response?.data) {
          setTreatments(response.data.data);
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

    if(treatmentState && treatmentState.type !== 'TREATMENT_CREATED') {
      if(treatmentState.type === 'TREATMENT_UPDATED') {
        const updatedTreatment = JSON.parse(treatmentState.payload) as Treatment;
        setTreatments(treatments.map((e: Treatment) => e.id === updatedTreatment.id ? updatedTreatment : e));
      } else {
        setPagination({
          ...pagination,
          page: 1,
          changed: !pagination.changed
        });
      }
      // do action
      resetTreatmentState();
    }
  }, [treatmentState]);

  return (
    <>
      <TreatmentsPageHeader />
      <Card className='p-4 min-h-[500px] w-full'>
        <TreatmentsFiltres
          filters={filters}
          setFilters={setFilters}
        />
        <TreatmentsData
          treatments={treatments}
          isLoading={isLoading}
        />
        <ListingPaginationComponent
          pagination={pagination}
          setPagination={setPagination}
          nbPages={nbPages}
        />
      </Card>
    </>
  );
};

export default Page;