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
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
    <div>
      <div className='md:hidden bg-white h-full flex items-center gap-x-2 py-1 pl-2'>
        <Sheet>
          <SheetTrigger type={'button'} className="md:w-full flex gap-x-2 md:hidden border border-primary bg-transparent hover:bg-accent hover:text-primary text-primary rounded-md items-center px-4 py-2">
            <SlidersHorizontal size={18}/>
            Filtrer
          </SheetTrigger>
          <SheetContent side={"right"} className='w-[70%] !max-w-[270px] md:hidden'>
            <div className="h-full overflow-y-auto flex flex-col gap-4">
              <SessionStatusFilter handleChange={handleChangeStatus} reset={reset} />
              <ServicesMultiSelectInput handleChange={handleChangeServices} reset={reset} modal={false} />
              <UsersMultiselectInput handleChange={handleChangePraticiens} modal={false} reset={reset} />
              <PatientsMultiSelectInput handleChange={handleChangePatients} modal={false} reset={reset} />
            </div>
          </SheetContent>
        </Sheet>
        <Button
          type={'reset'} variant='link' className='px-0 underline'
          onClick={handleReset}
        >
          Réinitialiser
          <RotateCcw size={15}/>
        </Button>
      </div>
      <div className={cn('md:flex hidden flex-col gap-4 bg-white h-[95vh] pb-16', containerClassName)}>
        <div className={'bg-primary text-white flex justify-center items-center gap-x-2 py-2'}>
          <p className="font-mono">Filtres</p>
          <Button
            className={'h-fit w-fit p-0'}
            onClick={handleReset}
          >
            <RotateCcw size={13} />
          </Button>
        </div>
        <div className='h-full overflow-y-auto flex flex-col gap-4'>
          <SessionStatusFilter handleChange={handleChangeStatus} reset={reset} />
          <ServicesMultiSelectInput handleChange={handleChangeServices} reset={reset} modal={false} />
          <UsersMultiselectInput handleChange={handleChangePraticiens} modal={false} reset={reset} />
          <PatientsMultiSelectInput handleChange={handleChangePatients} modal={false} reset={reset} />
        </div>
      </div>
    </div>
  );
};