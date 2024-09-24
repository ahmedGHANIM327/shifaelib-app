'use client';

import React, { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserStatus } from '@/lib/types';

type AccountStatusToggleProps = {
  value: UserStatus;
  onChange: (value: UserStatus) => void;
}
export const AccountStatusToggle:FC<AccountStatusToggleProps> = ({value, onChange}) => {
  const status = [
    {
      label: 'Actif',
      value: 'ACTIF'
    },
    {
      label: 'Bloqué',
      value: 'BLOCKED'
    }
  ]
  const [selectedItem, setSelectedItem] = useState<UserStatus>(value);
  const selectedClassName = 'bg-primary text-white hover:bg-primary hover:text-white';

  useEffect(()=> {
    onChange(selectedItem);
  }, [selectedItem])
  return (
    <div>
      {
        status.map((item) => (<Button
          key={item.value}
          className={cn('rounded-none', selectedItem === item.value && selectedClassName)}
          variant={'outline'}
          onClick={()=>setSelectedItem(item.value)}
          type={'button'}
        >
          {item.label}
        </Button>))
      }
    </div>
  );
};