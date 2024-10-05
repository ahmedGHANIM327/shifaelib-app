import React, {FC} from 'react';
import {cn} from "@/lib/utils";

export const InfoBlock:FC<{
  label:string;
  value?:string;
  labelClassName?: string;
  valueClassName?: string
}> = ({label, value, labelClassName, valueClassName}) => {
  return (
    <div className='mb-3'>
      <div className={cn('flex gap-x-2 font-bold text-md items-center', labelClassName)}>
        {label}
      </div>
      <p className={cn('text-primary', valueClassName)}>
        {(!value || value === '') ? '-' : value}
      </p>
    </div>
  );
};