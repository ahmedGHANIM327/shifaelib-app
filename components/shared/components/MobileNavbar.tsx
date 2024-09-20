import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import { FullSidebar } from './FullSidebar';

export const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[70%] !max-w-[270px] bg-primary">
        <FullSidebar />
      </SheetContent>
    </Sheet>
  );
};
