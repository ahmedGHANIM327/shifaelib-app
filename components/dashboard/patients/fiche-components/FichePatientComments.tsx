import React from 'react';
import { CardTitle } from '@/components/shared/components/CardTitle';
import { TextIcon } from 'lucide-react';

export const FichePatientComments = () => {
  const comments = [];
  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-2'>
        <CardTitle
          title={'Commentaires'}
          icon={<TextIcon size={20}/>}
          className={'mb-0'}
        />
      </div>
      {
        comments.length === 0 ? <div className="mt-2 bg-accent text-center py-14">
          Pas de commentaires
        </div> : <>
          comments
        </>
      }
    </div>
  );
};