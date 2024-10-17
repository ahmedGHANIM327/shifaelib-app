import React, { FC, useState } from 'react';
import { ServicesMultiSelectInput } from '@/components/shared/inputs/ServicesMultiSelectInput';
import { Service } from '@/lib/types/services';
import { AgendaFilters, SessionStatus } from '@/lib/types/patients/sessions';
import { cn } from '@/lib/utils';
import { User } from '@/lib/types/users';
import { UsersMultiselectInput } from '@/components/shared/inputs/UsersMultiselectInput';
import { Patient } from '@/lib/types/patients';
import { PatientsMultiSelectInput } from '@/components/shared/inputs/PatientsMultiSelectInput';
import { Button } from '@/components/ui/button';
import { SessionStatusFilter } from '@/components/dashboard/agenda/components/SessionStatusFilter';

export const FullAgendaFilters:FC<{filters: AgendaFilters; setFilters: (newFilters: AgendaFilters) => void;containerClassName?: string}> = ({filters,containerClassName, setFilters}) => {

  const [reset, setReset] = useState<boolean>(false);
  const handleChangeServices = (services: Service[]) => {
    setFilters({
      ...filters,
      services: services.map((s) => s.id)
    })
  }

  const handleChangePraticiens = (praticiens: User[]) => {
    setFilters({
      ...filters,
      praticiens: praticiens.map((p) => p.id)
    })
  }

  const handleChangePatients = (patients: Patient[]) => {
    setFilters({
      ...filters,
      patients: patients.map((p) => p.id)
    })
  }

  const handleChangeStatus = (status: SessionStatus[]) => {
    setFilters({
      ...filters,
      status
    })
  }

  const handleReset = () => {
    setReset(!reset);
    setFilters({
      patients: [],
      praticiens: [],
      services: [],
      status: []
    })
  }

  return (
    <div className={cn('hidden md:flex flex-col gap-4 bg-white h-[95vh] pb-16', containerClassName)}>
      <p className={'bg-primary text-white text-center py-2 font-mono'}>Filtres</p>
      <div className='h-full overflow-y-auto flex flex-col gap-4'>
        <SessionStatusFilter handleChange={handleChangeStatus}/>
        <ServicesMultiSelectInput handleChange={handleChangeServices} reset={reset} modal={false} />
        <UsersMultiselectInput handleChange={handleChangePraticiens} modal={false} reset={reset}/>
        <PatientsMultiSelectInput handleChange={handleChangePatients} modal={false} reset={reset}/>
      </div>
    </div>
  );
};