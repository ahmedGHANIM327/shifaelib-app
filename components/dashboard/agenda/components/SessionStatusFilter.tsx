import React, { FC, useEffect, useState } from 'react';
import {Ban, CheckCheck, Hourglass, X} from "lucide-react";
import { cn, getFullName } from '@/lib/utils';
import { SessionStatus } from '@/lib/types/patients/sessions';
import { convertSessionStatus } from '@/lib/helpers/agenda';
import { Checkbox } from '@/components/ui/checkbox';

export const SessionStatusFilter:FC<{
  handleChange: (status: SessionStatus[]) => void;
}> = ({
  handleChange
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
      className: 'bg-blue-50 text-blue-600 border-blue-600',
      selectedClassName: 'text-blue-50 bg-blue-600',
    },
    {
      id: 1,
      status: 'ATTENDED',
      icon: <CheckCheck size={11}/>,
      className: 'bg-green-50 text-green-600 border-green-600',
      selectedClassName: 'text-green-50 bg-green-600',
    },
    {
      id: 2,
      status: 'NOT_ATTENDED',
      icon: <Ban size={11}/>,
      className: 'bg-gray-50 text-gray-500 border-gray-500',
      selectedClassName: 'text-gray-50 bg-gray-500',
    },
    {
      id: 3,
      status: 'CANCELED',
      icon: <X size={11}/>,
      className: 'bg-red-50 text-red-500 border-red-500',
      selectedClassName: 'text-red-50 bg-red-500',
    }
  ];

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
            className="rounded-md flex items-center pl-2 gap-x-2 mb-2 text-sm"
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
              className={cn(`h-4 w-4`)}
            />
            {convertSessionStatus(s.status as SessionStatus)}</div>);
        })}
      </div>
    </div>
  );
};