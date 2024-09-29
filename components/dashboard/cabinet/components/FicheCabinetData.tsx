import React, { FC } from 'react';
import { Cabinet } from '@/lib/types/cabinet';
import { Card } from '@/components/ui/card';
import { CardTitle } from '@/components/shared/components/CardTitle';
import { Hospital, Mail, MapPin, Phone } from 'lucide-react';
import { UpdateCabinetForm } from '@/components/dashboard/cabinet/forms/UpdateCabinetForm';
import { Textarea } from '@/components/ui/textarea';

type FicheCabinetDataProps = {
  cabinet: Cabinet;
};
export const FicheCabinetData:FC<FicheCabinetDataProps> = ({ cabinet}) => {
  return (
    <Card className='p-2'>
      <div className='flex justify-between items-center'>
        <CardTitle
          title={'Cabinet informations'}
          icon={<Hospital size={18} />}
          className={'mb-0'}
          h4_className={'md:text-xl'}
        />
        <UpdateCabinetForm
          currentCabinet={cabinet}
        />
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <h2 className='text-2xl font-semibold text-center'>
          {cabinet.name}
        </h2>
        <p className='text-sm bg-primary text-white px-4 py-1 rounded-md mt-1 w-fit'>{cabinet.speciality}</p>
      </div>
      <div className='mt-6 flex flex-col gap-y-2 w-full text-md'>
        <p className='flex gap-x-2 items-center'>
          <span><MapPin size={18} /></span>
          <span>{cabinet?.address}</span>
        </p>
        <p className='flex gap-x-2 items-center'>
          <span><Mail size={18} /></span>
          <span>{cabinet?.email || '-'}</span>
        </p>
        <p className='flex gap-x-2 items-center'>
          <span><Phone size={18} /></span>
          <span>{cabinet?.phone || '-'}</span>
        </p>
      </div>
      <div className='mt-4 border-2'>
        <Textarea value={cabinet.description} disabled={true} className='disabled:opacity-100 disabled:cursor-text'/>
      </div>
    </Card>
  );
};