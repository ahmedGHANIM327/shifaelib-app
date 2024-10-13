import React from 'react';
import { Card } from '@/components/ui/card';
import { AgendaComponent } from '@/components/shared/components/AgendaComponent';
import { FullAgendaFilters } from '@/components/dashboard/agenda/components/FullAgendaFilters';

const Page = () => {

  return (
    <Card className={'rounded-none'}>
      <div>
        <FullAgendaFilters />
      </div>
      <AgendaComponent />
    </Card>
  );
};

export default Page;