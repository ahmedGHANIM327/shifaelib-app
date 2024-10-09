'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { TreatmentsPageHeader } from '@/components/dashboard/patients/treatments/components/TreatmentsPageHeader';
import { Card } from '@/components/ui/card';
import { TreatmentsFiltres } from '@/components/dashboard/patients/treatments/components/TreatmentsFilters';
import useTreatmentStore from '@/stores/patient/treatment';
import { ListingPagination } from '@/lib/types';
import { ListingPaginationComponent } from '@/components/shared/components/ListingPagination';
import { toast } from 'react-toastify';
import { getFilteredTreatments } from '@/server/services/patients/treatments';
import { Treatment } from '@/lib/types/patients/treatments';
import { TreatmentsData } from '@/components/dashboard/patients/treatments/components/TreatmentData';

const Page = () => {

  const setReloadTreatments = useTreatmentStore((state) => state.setReloadTreatments);
  const reloadListingTreatments = useTreatmentStore((state) => state.reloadListingTreatments);
  const filters = useTreatmentStore((state) => state.listingFilters);
  const [pagination, setPagination] = useState<ListingPagination>({
    page: 1,
    nbItemPerPage: 10,
    changed: true
  });
  const [isLoading, startTransition] = useTransition();
  const [nbPages, setNbPages] = useState<number>(1);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    if(reloadListingTreatments) {
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
        } finally {
          setReloadTreatments(false);
        }
      });
    }
  }, [reloadListingTreatments]);

  useEffect(() => {
    setReloadTreatments(true);
  }, [pagination]);

  useEffect(() => {
    setPagination({
      ...pagination,
      page: 1,
      changed: !pagination.changed
    });
  }, [filters]);

  useEffect(() => {
    console.log('treatments', treatments);
  }, [treatments]);

  return (
    <>
      <TreatmentsPageHeader />
      <Card className='p-4 min-h-[500px] w-full'>
        <TreatmentsFiltres />
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