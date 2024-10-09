import React from 'react';
import { FullSidebar } from '@/components/shared/components/FullSidebar';
import { DashboardHeader } from '@/components/shared/components/DashboardHeader';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-full fixed top-0 left-0 grid grid-cols-7 h-full">
        <div className="hidden xl:flex xl:col-span-1">
          <ScrollArea className="w-full h-full bg-primary px-2">
            <FullSidebar />
          </ScrollArea>
        </div>
        <div className="h-full max-w-full bg-accent flex flex-col xl:col-span-6 col-span-7">
          <DashboardHeader />
          <div className="p-4 xl:pr-6 pb-16 overflow-y-scroll h-full max-w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
