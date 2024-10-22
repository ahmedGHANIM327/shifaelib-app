'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { SearchInput } from '@/components/shared/inputs/SearchInput';
import { Patient } from '@/lib/types/patients';
import { getFilteredPatients } from '@/server/services/patients';
import { toast } from 'react-toastify';
import { cn, getFullName } from '@/lib/utils';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { MoveRight, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const SearchPatientComonent = () => {

  const [patients, setPatients] = useState<Patient[]>([] as Patient[]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    setSearchInput('');
  }, [isDialogOpen]);

  const handleClick = (id: string) => {
    router.push(`/patients/${id}`);
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        {!isDialogOpen && <SearchInput
          handleSearch={()=>console.log('')}
          label={'Rechercher un patient'}
          className={'w-fit min-w-[300px] cursor-pointer bg-accent'}
        />}
      </DialogTrigger>
      <DialogContent className={cn("md:w-[550px] md:max-w-[850px] p-0")}>
        <DialogFormTitle
          title={'Chercher un patient'}
        />
        <DialogFormContainer className='-mt-4 overflow-auto'>
          <SearchInput
            handleSearch={setSearchInput}
            label={'rechercher un patient...'}
            className={'-mt-2 cursor-pointer text-primary placeholder:text-primary border-primary'}
            iconeClassName={'text-primary'}
          />
          {
            isLoading ? <div className={'bg-accent w-full flex items-center justify-center py-8 mt-2'}>
              <LoadingSpinner size={30} className="text-primary" />
            </div> : <div className="flex flex-col gap-y-1 mt-2">
              { patients.length === 0 ? <div className={'bg-accent w-full flex items-center justify-center py-8'}>
                Pas de patients
              </div> : patients.map((p) => (
                <div key={p.id} className="bg-accent px-2 py-2 flex justify-between items-center">
                  {getFullName(p, true)}
                  <Button onClick={()=>handleClick(p.id)} variant={'link'} className={'p-0'}>
                    <MoveRight size={22}/>
                  </Button>
              </div>))}
            </div>
          }
        </DialogFormContainer>
      </DialogContent>
    </Dialog>
  );
};