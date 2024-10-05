import React, { FC } from 'react';
import { LoadingSection } from '@/components/shared/components/LoadingSection';
import { ColumnDef, RowData } from '@tanstack/react-table';
import DataTable from '@/components/shared/components/DataTable';
import { PatientColumns } from '@/components/dashboard/patients/components/PatientColumns';
import { Patient } from '@/lib/types/patients';
import { ServiceCardLisiting } from '@/components/dashboard/services/components/ServiceCardLisiting';
import { PatientCard } from '@/components/dashboard/patients/components/PatientCard';
import { ServicesColumns } from '@/components/dashboard/services/components/ServicesColumns';

export const PatientsData:FC<{patients: Patient[];isLoading: boolean}> = ({patients, isLoading}) => {

  return (
    <LoadingSection
      loading={isLoading}
      loadingClassName={'w-full h-[200px] my-4'}
    >
      <div className='hidden md:flex'>
        <DataTable columns={PatientColumns as ColumnDef<RowData>[]} data={patients || []}
                   noDataText={`Pas de patients`} />
      </div>
      <div className='md:hidden flex flex-col gap-4'>
        {patients.map((patient, index) => (<PatientCard patient={patient} key={index} />))}
      </div>
    </LoadingSection>
  );
};