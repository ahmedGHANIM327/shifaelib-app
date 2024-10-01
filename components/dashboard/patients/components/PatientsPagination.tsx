import React, { FC } from 'react';
import { PaginationComponent } from '@/components/shared/components/PaginationComponent';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PatientListingPagination } from '@/lib/types/patients';

type PatientsPaginationProps = {
  pagination: PatientListingPagination;
  setPagination: (pagination: PatientListingPagination) => void;
  nbPages: number;
}

export const PatientsPagination:FC<PatientsPaginationProps> = ({ pagination, nbPages, setPagination }) => {

  const handleNbItemsPerPage = (value:string) => {
    setPagination({
      ...pagination,
      nbItemPerPage: parseInt(value)
    })
  }

  const handlePage = (value:number) => {
    setPagination({
      ...pagination,
      page: value
    })
  }

  return (
    <div className='mt-4 flex justify-between'>
      <p className='w-fit whitespace-nowrap'>Page {pagination.page} sur {nbPages}</p>
      <PaginationComponent
        nbPages={nbPages}
        page={pagination.page}
        handleChangePage={handlePage}
      />
      <Select onValueChange={handleNbItemsPerPage} defaultValue={''+pagination.nbItemPerPage}>
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder="Nombre de patients par page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Nombre de patients par page</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};