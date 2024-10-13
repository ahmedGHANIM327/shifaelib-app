import React from 'react';
import { Card } from '@/components/ui/card';
import { AgendaComponent } from '@/components/shared/components/AgendaComponent';

const Page = () => {

  return (
    <Card className={'rounded-none'}>
      <AgendaComponent />
    </Card>
  );
};

export default Page;