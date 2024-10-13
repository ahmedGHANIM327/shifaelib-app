import React, {FC} from 'react';
import {SessionStatus} from "@/lib/types/patients/sessions";
import {convertSessionStatus} from "@/lib/helpers/agenda";
import {cn} from "@/lib/utils";
import {Ban, CheckCheck, Hourglass, X} from "lucide-react";

export const SessionStatusComponent:FC<{
  status: SessionStatus;
  className?: string;
  onlyIcon?:boolean;
  onlySpan?:boolean;
  filtersSpan?: boolean
}> = ({status,className, onlyIcon = false, onlySpan = false, filtersSpan = false}) => {

  if(onlySpan) {
    return (
      <span className={cn('bg-blue-600 rounded-full w-3 h-3',
        status === 'ATTENDED' && 'bg-green-600',
        status === 'NOT_ATTENDED' && 'bg-gray-500',
        status === 'CANCELED' && 'bg-red-500',
        className
      )}>
            </span>
    )
  }
  if(onlyIcon) {
    return (
      <span className={cn('bg-blue-600 rounded-full p-1 text-white',
        status === 'ATTENDED' && 'bg-green-600',
        status === 'NOT_ATTENDED' && 'bg-gray-500',
        status === 'CANCELED' && 'bg-red-500',
        className
      )}>
                {status === 'SCHEDULED' && <Hourglass size={12}/>}
        {status === 'CANCELED' && <X size={12}/>}
        {status === 'ATTENDED' && <CheckCheck size={12}/>}
        {status === 'NOT_ATTENDED' && <Ban size={12}/>}
            </span>
    )
  }

  if(filtersSpan) {
    return (
      <p className={cn('bg-blue-800 text-white text-sm w-fit rounded-md font-mono flex items-center gap-x-1 px-4',
        status === 'ATTENDED' && 'bg-green-800',
        status === 'NOT_ATTENDED' && 'bg-gray-700',
        status === 'CANCELED' && 'bg-red-700',
        className
      )}>
        {status === 'SCHEDULED' && <Hourglass size={11}/>}
        {status === 'CANCELED' && <X size={11}/>}
        {status === 'ATTENDED' && <CheckCheck size={11}/>}
        {status === 'NOT_ATTENDED' && <Ban size={11}/>}
        {convertSessionStatus(status)}
      </p>
    );
  }
  return (
    <p className={cn('bg-blue-50 text-blue-600 border-blue-600 text-sm w-fit py-1 rounded-md font-mono flex items-center gap-x-2 px-4 border',
      status === 'ATTENDED' && 'bg-green-50 text-green-600 border-green-600',
      status === 'NOT_ATTENDED' && 'bg-gray-50 text-gray-500 border-gray-500',
      status === 'CANCELED' && 'bg-red-50 text-red-500 border-red-500',
      className
    )}>
      {convertSessionStatus(status)}
      {status === 'SCHEDULED' && <Hourglass size={11}/>}
      {status === 'CANCELED' && <X size={11}/>}
      {status === 'ATTENDED' && <CheckCheck size={11}/>}
      {status === 'NOT_ATTENDED' && <Ban size={11}/>}
    </p>
  );
};