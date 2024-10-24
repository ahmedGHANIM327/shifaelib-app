import React, { FC, useEffect, useState } from 'react';
import { SearchInput } from '@/components/shared/inputs/SearchInput';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownWideNarrow, ArrowUpWideNarrow, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { UsersMultiselectInput } from '@/components/shared/inputs/UsersMultiselectInput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn, convertTreatmentStatus } from '@/lib/utils';
import { User } from '@/lib/types/users';
import { TreatmentListingFilters, TreatmentStatus } from '@/lib/types/patients/treatments';
import { ServicesMultiSelectInput } from '@/components/shared/inputs/ServicesMultiSelectInput';
import { Service } from '@/lib/types/services';
import { Patient } from '@/lib/types/patients';
import { PatientsMultiSelectInput } from '@/components/shared/inputs/PatientsMultiSelectInput';
import useTreatmentStore from '@/stores/patient/treatment';

type TreatmentsFiltresProps = {
  filters: TreatmentListingFilters;
  setFilters: (newFilters: TreatmentListingFilters) => void;
}

export const TreatmentsFiltres:FC<TreatmentsFiltresProps> = ({ filters, setFilters }) => {

  const treatmentState = useTreatmentStore((state) => state.state);
  const resetTreatmentState = useTreatmentStore((state) => state.resetState);

  const [hideFilters, setHideFilters] = React.useState(true);
  const [reset, setReset] = useState<boolean>(false);

  const handleSearch = (e: string) => {
    setFilters({
      ...filters,
      search: e
    });
  }

  const handleSort = (e: 'creation_date_desc' | 'creation_date_asc') => {
    setFilters({
      ...filters,
      sort: e
    });
  }

  const handleStatus = (e: TreatmentStatus | 'ALL') => {
    setFilters({
      ...filters,
      status: e
    });
  }

  const handlePraticien = (users: User[]) => {
    const userIds = users.map(u => u.id);
    setFilters({
      ...filters,
      responsible: userIds
    });
  }

  const handleService = (services: Service[]) => {
    const servicesId = services.map(s => s.id);
    setFilters({
      ...filters,
      service: servicesId
    });
  }

  const handlePatient = (patients: Patient[]) => {
    const patientsId = patients.map(p => p.id);
    setFilters({
      ...filters,
      patient: patientsId
    });
  }

  const handleReset = () => {
    setReset(!reset);
  }

  useEffect(() => {
    setFilters({
      patient: [],
      responsible: [],
      service: [],
      sort: 'creation_date_desc',
      search: '',
      status: 'ALL'
    });
  }, [reset]);

  useEffect(() => {
    if(treatmentState && treatmentState.type === 'TREATMENT_CREATED') {
      setReset(!reset);
      // do action
      resetTreatmentState();
    }
  }, [treatmentState]);

  return (
    <div className='w-full flex flex-col gap-2 mb-2'>
      <form>
        <div className='flex justify-between items-center flex-wrap gap-2'>
          <div className='md:max-w-[500px] w-full'>
            <SearchInput
              handleSearch={handleSearch}
              label={'Rechercher par code...'}
            />
          </div>
          <div className='md:flex grid grid-cols-2 sm:grid-cols-3 md:w-fit w-full gap-2'>
            <Button onClick={handleReset} type={'reset'} variant='link' className='px-0 underline'>
              <RotateCcw size={15}/>
              Réinitialiser
            </Button>
            <Button className='gap-x-2 border' onClick={()=>setHideFilters(!hideFilters)} variant={'ghost'} type={'button'}>
              <SlidersHorizontal size={14}/>
              Filtrer
            </Button>
            <Select onValueChange={handleSort} value={filters.sort}>
              <SelectTrigger className='bg-white col-span-2 sm:col-span-1'>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trier par</SelectLabel>
                  <SelectItem value="creation_date_desc">
                            <span className='flex items-center gap-x-4'>
                                Créés récemment<ArrowDownWideNarrow size={13}/>
                            </span>
                  </SelectItem>
                  <SelectItem value="creation_date_asc">
                            <span className='flex items-center gap-x-4'>
                            Créés anciennement <ArrowUpWideNarrow size={13}/>
                            </span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div
          className={cn('bg-accent rounded-md p-2 py-3 grid md:grid-cols-4 grid-cols-1 gap-y-4 gap-x-3 mt-2', hideFilters && 'h-0 p-0 overflow-hidden')}>
          <div className='flex flex-col gap-2'>
            <Label>Genre</Label>
            <Select onValueChange={handleStatus} value={filters.status}>
              <SelectTrigger className={'bg-white'}>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trier par</SelectLabel>
                  <SelectItem value="ALL">
                    Tous
                  </SelectItem>
                  <SelectItem value="IN_PROGRESS">
                    {convertTreatmentStatus('IN_PROGRESS')}
                  </SelectItem>
                  <SelectItem value="ON_HOLD">
                    {convertTreatmentStatus('ON_HOLD')}
                  </SelectItem>
                  <SelectItem value="COMPLETED">
                    {convertTreatmentStatus('COMPLETED')}
                  </SelectItem>
                  <SelectItem value="CANCELLED">
                    {convertTreatmentStatus('CANCELLED')}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Praticien</Label>
            <UsersMultiselectInput handleChange={handlePraticien} reset={reset} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Service</Label>
            <ServicesMultiSelectInput handleChange={handleService} reset={reset} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Patient</Label>
            <PatientsMultiSelectInput handleChange={handlePatient} reset={reset} />
          </div>
        </div>
      </form>
    </div>
  );
};