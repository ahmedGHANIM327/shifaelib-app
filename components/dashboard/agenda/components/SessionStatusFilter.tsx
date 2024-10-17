import React, { FC, useEffect, useState } from 'react';
import {Ban, CheckCheck, Hourglass, X} from "lucide-react";
import { cn } from '@/lib/utils';
import { SessionStatus } from '@/lib/types/patients/sessions';
import { convertSessionStatus } from '@/lib/helpers/agenda';
import { Checkbox } from '@/components/ui/checkbox';

export const SessionStatusFilter:FC<{
  handleChange: (status: SessionStatus[]) => void;
  reset?: boolean;
}> = ({
  handleChange,
  reset
      }) => {

  const [selectedStatus, setSelectedStatus] = useState<SessionStatus[]>([]);

  const checkStatusSelected = (item: SessionStatus) => {
    return selectedStatus.includes(item);
  }

  const items = [
    {
      id: 0,
      status: 'SCHEDULED',
      icon: <Hourglass size={11}/>,
      className: 'text-blue-600',
      checkboxNonSelected: 'text-blue-50 border-blue-600 bg-blue-50 data-[state=checked]:bg-blue-600',
      checkboxSelected: 'bg-blue-600'
    },
    {
      id: 1,
      status: 'ATTENDED',
      icon: <CheckCheck size={11}/>,
      className: 'text-green-600',
      checkboxNonSelected: 'text-green-50 border-green-600 bg-green-50 data-[state=checked]:bg-green-600',
      checkboxSelected: 'bg-green-600'
    },
    {
      id: 2,
      status: 'NOT_ATTENDED',
      icon: <Ban size={11}/>,
      className: 'text-gray-500',
      checkboxNonSelected: 'text-gray-50 border-gray-500 bg-gray-50 data-[state=checked]:bg-gray-500',
      checkboxSelected: 'bg-gray-500'
    },
    {
      id: 3,
      status: 'CANCELED',
      icon: <X size={11}/>,
      className: 'text-red-500',
      checkboxNonSelected: 'text-red-50 border-red-500 bg-red-50 data-[state=checked]:bg-red-500',
      checkboxSelected: 'bg-red-500'
    }
  ];

  useEffect(() => {
    setSelectedStatus([] as SessionStatus[]);
  }, [reset]);

  useEffect(() => {
    handleChange(selectedStatus);
  }, [selectedStatus]);

  return (
    <div className="pl-2 w-full">
      <p className={'font-mono text-primary mb-2'}>Statut</p>
      <div className='my-1 flex flex-col'>
        {items.map((s) => {
          return (<div
            key={s.id}
            className={`rounded-md flex items-center pl-2 gap-x-2 mb-2 text-sm ${s.className}`}
          >
            <Checkbox
              checked={checkStatusSelected(s.status as SessionStatus)}
              onCheckedChange={(checked) => {
                return checked
                  ? setSelectedStatus([...selectedStatus, (s.status as SessionStatus)])
                  : setSelectedStatus(
                    selectedStatus.filter(
                      (value) => value !== s.status
                    )
                  );
              }}
              className={cn(`h-4 w-4 ${s.checkboxNonSelected}`,
                checkStatusSelected(s.status as SessionStatus) && s.checkboxSelected)}
            />
            {convertSessionStatus(s.status as SessionStatus)}
            {s.icon}
          </div>);
        })}
      </div>
    </div>
  );
};