import React, { FC } from 'react';
import { LoadingSection } from '@/components/shared/components/LoadingSection';
import { ColumnDef, RowData } from '@tanstack/react-table';
import DataTable from '@/components/shared/components/DataTable';
import { Treatment } from '@/lib/types/patients/treatments';
import { TreatmentColumns } from '@/components/dashboard/patients/treatments/components/TreatmentColumns';
import { TreatmentPhoneCard } from '@/components/dashboard/patients/treatments/components/TreatmentPhoneCard';

export const TreatmentsData:FC<{treatments: Treatment[];isLoading: boolean}> = ({treatments, isLoading}) => {

  return (
    <LoadingSection
      loading={isLoading}
      loadingClassName={'w-full h-[200px] my-4'}
      withCard={true}
    >
      <div className='hidden md:flex'>
        <DataTable columns={TreatmentColumns as ColumnDef<RowData>[]} data={treatments || []}
                   noDataText={`Pas de traitements`} className={'min-w-[1600px]'} />
      </div>
      <div className='md:hidden flex flex-col gap-4 mt-4'>
        {treatments.map((treatment, index) => (<TreatmentPhoneCard treatment={treatment} key={index} />))}
      </div>
    </LoadingSection>
  );
};