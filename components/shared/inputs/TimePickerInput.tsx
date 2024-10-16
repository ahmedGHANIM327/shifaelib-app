import React from 'react';
import { Input } from '@/components/ui/input';
import { Clock1Icon, Clock2Icon } from 'lucide-react';

const TimePickerInput = () => {
  return (
    <div className='flex gap-x-2 items-center'>
      <Clock2Icon size={16}/>
      <Input placeholder="hh" type={'number'} min={0} className={'w-[100px]'}/> :
      <Input placeholder="mm" type={'number'} min={0} className={'w-[100px]'}/>
    </div>
  );
};

export default TimePickerInput;