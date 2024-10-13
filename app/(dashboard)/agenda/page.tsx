import React from 'react';
import { AgendaComponent } from '@/components/shared/components/AgendaComponent';

const Page = () => {

  return (
    <div className={'rounded-none absolute top-0 left-0 h-[100vh] grid grid-cols-7'}>
      <div className='col-span-1'>
        Filters
      </div>
      <AgendaComponent
        users={[]}
        views={['Day', 'WorkWeek', 'Week', 'Month']}
        height={'95vh'}
        containerClassName={'col-span-6'}
      />
    </div>
  );
};

export default Page;