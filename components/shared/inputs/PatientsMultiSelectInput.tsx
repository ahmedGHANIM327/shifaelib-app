'use client';

import React, { FC, useEffect, useState, useTransition } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn, getFullName } from '@/lib/utils';
import useUserStore from '@/stores/user';
import { User } from '@/lib/types/users';
import { Patient } from '@/lib/types/patients';
import { SearchInput } from '@/components/shared/inputs/SearchInput';
import { getFilteredPatients } from '@/server/services/patients';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';

type PatientsMultiSelectInputProps = {
  handleChange: (patient: Patient[]) => void;
  reset?: boolean;
};

export const PatientsMultiSelectInput:FC<PatientsMultiSelectInputProps> = ({ handleChange, reset }) => {

  const [open, setOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>([] as Patient[]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, startTransition] = useTransition();
  const [patients, setPatients] = useState<Patient[]>([] as Patient[]);

  const checkPatientSelected = (item: Patient) => {
    for (let index in selectedPatients) {
      if(selectedPatients[index].id === item.id) return true;
    }
    return false;
  }

  const SelectedTypesLabel = () => {
    if(selectedPatients && selectedPatients.length !== 0) {
      return (<p className='flex items-center gap-x-2'>
        {selectedPatients.length > 0 && <div className='flex gap-x-1'>
          <span className="bg-primary text-white rounded-md py-0 p-2 flex justify-center items-center">{getFullName(selectedPatients[0], true)}</span>
          {selectedPatients.length > 1 && <span className="bg-primary text-white rounded-md py-0 p-2 flex justify-center items-center">+{selectedPatients.length-1}</span>}
        </div>}
      </p>)
    } else {
      return (<p className='flex items-center font-light'>
        Patients ...
      </p>)
    }
  }

  const handleReset = () => {
    setSelectedPatients([] as Patient[]);
    setSearchInput('');
  }

  useEffect(() => {
    handleChange(selectedPatients);
  }, [selectedPatients]);

  useEffect(() => {
    handleReset();
  }, [reset]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getFilteredPatients({
          search: searchInput,
          sort: 'creation_date_desc',
          gender: 'ALL',
          createdBy: []
        }, {
          page: 1,
          changed: true,
          nbItemPerPage: 5
        });
        if(response.ok && response?.data) {
          setPatients(response.data.data);
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"justify-between w-full"}
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
                if(checkPatientSelected(item)) {
                  const newValues = selectedPatients.filter((p) => p.id != item.id);
                  setSelectedPatients(newValues);
                } else {
                  setSelectedPatients([...selectedPatients, item]);
                }
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  checkPatientSelected(item) ? "opacity-100" : "opacity-0"
                )}
              />
              <div>
                <p>{getFullName(item, true)}</p>
              </div>
            </CommandItem>)}
          </CommandList>}
        </Command>
        <div className="flex justify-end">
          <Button variant='link' onClick={handleReset}>Effacer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};