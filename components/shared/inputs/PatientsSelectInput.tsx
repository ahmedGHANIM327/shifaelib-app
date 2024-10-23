'use client';

import React, { FC, useEffect, useState, useTransition } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandItem, CommandList } from '@/components/ui/command';
import { cn, getFullName, removeDuplicationById } from '@/lib/utils';
import { Patient } from '@/lib/types/patients';
import { SearchInput } from '@/components/shared/inputs/SearchInput';
import { searchPatientsV2 } from '@/server/services/patients';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';

type PatientSelectInputProps = {
  handleChange: (patient: Patient) => void;
  reset?: boolean;
  disabled?: boolean;
  selectedId?: string;
};

export const PatientsSelectInput:FC<PatientSelectInputProps> = ({ handleChange, reset, disabled = false, selectedId }) => {

  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient>({} as Patient);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, startTransition] = useTransition();
  const [patients, setPatients] = useState<Patient[]>([] as Patient[]);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const checkUserSelected = (item: Patient) => {
    return selectedPatient.id === item.id;
  }

  const SelectedTypesLabel = () => {
    if(selectedPatient.id) {
      return (<p className='flex items-center gap-x-2'>
        {getFullName(selectedPatient)}
      </p>)
    } else {
      return (<p className='flex items-center font-light'>
        Patients ...
      </p>)
    }
  }

  useEffect(() => {
    handleChange(selectedPatient);
  }, [selectedPatient]);

  useEffect(() => {
    if(firstRender) {
      setFirstRender(false);
    } else {
      setSelectedPatient({} as Patient);
    }
  }, [reset]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await searchPatientsV2(searchInput, 5, selectedId);
        if(response.ok && response?.data) {
          setPatients(response.data);
        } else {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  }, [searchInput]);

  useEffect(() => {
    if(selectedId && !selectedPatient.id) {
      const currentPatient = patients.find(p=> p.id === selectedId) || {} as Patient;
      setSelectedPatient(currentPatient);
    }
  }, [patients]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"justify-between w-full disabled:opacity-100 disabled:cursor-pointer"}
          disabled={disabled}
        >
          <SelectedTypesLabel />
          <ChevronsUpDown size={13} className={'opacity-50'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"p-0 min-w-[300px] w-full"}>
        <Command>
          <SearchInput
            handleSearch={setSearchInput}
          />
          {isLoading ? <div className={'bg-accent w-full flex items-center justify-center py-8 mt-2'}>
            <LoadingSpinner size={30} className="text-primary" />
          </div> : <CommandList>
            <CommandEmpty>Pas de résultats.</CommandEmpty>
            {patients.map((item) => <CommandItem
              className="cursor-pointer bg-accent mb-1 py-2 w-full"
              key={item.id}
              value={JSON.stringify(item)}
              onSelect={() => {
                if(!checkUserSelected(item)) {
                  setSelectedPatient(item);
                }
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  checkUserSelected(item) ? "opacity-100" : "opacity-0"
                )}
              />
              <div>
                <p>{getFullName(item)}</p>
              </div>
            </CommandItem>)}
          </CommandList>}
        </Command>
        <div className="flex justify-end">
          <Button variant='link' onClick={()=>setSelectedPatient({} as Patient)}>Effacer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};