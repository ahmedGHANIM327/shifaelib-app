import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';

export const FullAgendaFilters = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-2 border border-primary text-primary flex justify-center items-center gap-x-1 px-4">
        <SlidersHorizontal size={14}/>
        Filtrer
      </SheetTrigger>
      <SheetContent side={'right'} className="w-[70%] !max-w-[350px]">
        agenda filters
      </SheetContent>
    </Sheet>
  );
};