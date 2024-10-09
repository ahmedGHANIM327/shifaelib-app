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
import { ListingPagination } from '@/lib/types';

type ListingPaginationProps = {
  pagination: ListingPagination;
  setPagination: (pagination: ListingPagination) => void;
  nbPages: number;
}

export const ListingPaginationComponent:FC<ListingPaginationProps> = ({ pagination, setPagination, nbPages }) => {

  const handleNbItemsPerPage = (value:string) => {
    setPagination({
      ...pagination,
      nbItemPerPage: parseInt(value)
    })
  }

  const handlePage = (value:number) => {
    if(value !== pagination.page) {
      setPagination({
        ...pagination,
        page: value
      })
    }
  }

  return (
    <div className='mt-4 flex justify-between items-center'>
      <p className='w-fit whitespace-nowrap md:flex hidden'>Page {pagination.page} sur {nbPages}</p>
      <p className='w-fit whitespace-nowrap md:hidden'>{pagination.page} / {nbPages}</p>
      <PaginationComponent
        nbPages={nbPages}
        page={pagination.page}
        handleChangePage={handlePage}
      />
      <Select onValueChange={handleNbItemsPerPage} defaultValue={'' + pagination.nbItemPerPage}>
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder="Nombre de patients par page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Nombre de patients par page</SelectLabel>
            <SelectItem value="1">1</SelectItem>
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