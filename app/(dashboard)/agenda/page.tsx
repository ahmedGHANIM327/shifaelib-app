import React from 'react';
import { AgendaComponent } from '@/components/shared/components/AgendaComponent';

const Page = () => {

  return (
    <div className={'rounded-none absolute top-0 left-0 h-[100vh] grid grid-cols-7'}>
      <div className='md:col-span-1 hidden md:flex'>
        Filters
      </div>
      <AgendaComponent
        users={[]}
        views={['Day', 'WorkWeek', 'Week', 'Month']}
        height={'95vh'}
        containerClassName={'md:col-span-6 col-span-7'}
      />
    </div>
  );
};

export default Page;