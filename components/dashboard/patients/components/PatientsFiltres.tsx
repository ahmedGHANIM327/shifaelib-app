import React from 'react';
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
import { UsersMultiselectInput } from '@/components/shared/inputs/UsersMiltiselectInput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { User } from '@/lib/types/users';
import usePatientStore from '@/stores/patient';

export const PatientsFiltres = () => {

  const listingFilters = usePatientStore((state) => state.listingFilters);
  const setListingFilters = usePatientStore((state) => state.setListingFilters);
  const resetFilters = usePatientStore((state) => state.resetFilters);
  const setResetFilters = usePatientStore((state) => state.setResetFilters);

  const [hideFilters, setHideFilters] = React.useState(true);

  const handleSearch = (e: string) => {
    setListingFilters({
      ...listingFilters,
      search: e
    });
  }

  const handleSort = (e: 'creation_date_desc' | 'creation_date_asc') => {
    setListingFilters({
      ...listingFilters,
      sort: e
    });
  }

  const handleGender = (e: 'M' | 'F' | 'ALL') => {
    setListingFilters({
      ...listingFilters,
      gender: e
    });
  }

  const handleCreatedBy = (users: User[]) => {
    const userIds = users.map(u => u.id);
    setListingFilters({
      ...listingFilters,
      createdBy: userIds
    });
  }

  return (
    <div className='w-full flex flex-col gap-2 mb-2'>
      <form>
      <div className='flex justify-between items-center flex-wrap gap-2'>
        <div className='md:max-w-[500px] w-full'>
          <SearchInput
            handleSearch={handleSearch}
          />
        </div>
        <div className='md:flex grid grid-cols-2 md:w-fit w-full gap-2'>
          <Button onClick={setResetFilters} type={'reset'} variant='link' className='px-0 underline'>
            <RotateCcw size={15}/>
            Réinitialiser
          </Button>
          <Button className='gap-x-2 border' onClick={()=>setHideFilters(!hideFilters)} variant={'ghost'} type={'button'}>
            <SlidersHorizontal size={14}/>
            Filtrer
          </Button>
          <Select onValueChange={handleSort} value={listingFilters.sort}>
            <SelectTrigger className='bg-white'>
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
      <div className={cn('bg-accent rounded-md p-2 grid md:grid-cols-4 grid-cols-1 gap-y-4 gap-x-2 mt-2', hideFilters && 'h-0 p-0 overflow-hidden')}>
          <div className='flex flex-col gap-2'>
            <Label>Genre</Label>
            <Select onValueChange={handleGender} value={listingFilters.gender}>
              <SelectTrigger className={'bg-white'}>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trier par</SelectLabel>
                  <SelectItem value="ALL">
                    Tous
                  </SelectItem>
                  <SelectItem value="M">
                    Homme
                  </SelectItem>
                  <SelectItem value="F">
                    Femme
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Crée par</Label>
            <UsersMultiselectInput handleChange={handleCreatedBy} reset={resetFilters}
          />
        </div>
      </div>
      </form>
    </div>
  );
};