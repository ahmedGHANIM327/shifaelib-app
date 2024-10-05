import React, { FC } from 'react';
import { LoadingSection } from '@/components/shared/components/LoadingSection';
import { ColumnDef, RowData } from '@tanstack/react-table';
import DataTable from '@/components/shared/components/DataTable';
import { PatientColumns } from '@/components/dashboard/patients/components/PatientColumns';
import { Patient } from '@/lib/types/patients';

export const PatientsData:FC<{patients: Patient[];isLoading: boolean}> = ({patients, isLoading}) => {

  return (
    <LoadingSection
      loading={isLoading}
      loadingClassName={'w-full h-[200px] my-4'}
    >
      <DataTable columns={PatientColumns as ColumnDef<RowData>[]} data={patients || []} noDataText={`Pas de patients`}/>
    </LoadingSection>
  );
};