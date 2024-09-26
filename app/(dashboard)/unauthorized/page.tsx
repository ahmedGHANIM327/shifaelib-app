import React from 'react';
import { LockKeyhole } from 'lucide-react';

const Page = () => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <LockKeyhole size={70} className={'text-destructive'}/>
      <h1 className={'text-destructive text-4xl font-semibold mt-3 mb-1'}>Accès refusé</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className='text-primary opacity-75 text-center'>Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
    </div>
  );
};

export default Page;