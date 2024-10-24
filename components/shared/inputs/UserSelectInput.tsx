'use client';

import React, { FC, useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn, getFullName } from '@/lib/utils';
import useUserStore from '@/stores/user';
import { User } from '@/lib/types/users';
import { UserStatus } from '@/lib/types';
import { UserAccountStatus } from '@/components/dashboard/user/components/UserAccountStatus';

type UsersMultiselectInputProps = {
  handleChange: (users: User) => void;
  value?: User;
  reset?: boolean;
};

export const UsersSelectInput:FC<UsersMultiselectInputProps> = ({ handleChange, reset, value }) => {

  const [open, setOpen] = useState(false);
  const users = useUserStore((state) => state.cabinetUsers);
  const [selectedUser, setSelectedUser] = useState<User>((value || {}) as User);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const checkUserSelected = (item: User) => {
    return selectedUser.id === item.id;
  }

  const SelectedTypesLabel = () => {
    if(selectedUser.id) {
      return (<p className='flex items-center gap-x-2'>
        {getFullName(selectedUser, true)}
      </p>)
    } else {
      return (<p className='flex items-center font-light'>
        Utilisateurs ...
      </p>)
    }
  }

  useEffect(() => {
    handleChange(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    if(firstRender) {
      setFirstRender(false);
    } else {
      setSelectedUser({} as User);
    }
  }, [reset]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"justify-between w-full"}
        >
          <SelectedTypesLabel />
          <ChevronsUpDown size={13} className={'opacity-50'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"p-0 min-w-[300px] w-full"}>
        <Command>
          <CommandList>
            <CommandEmpty>Pas de résultats.</CommandEmpty>
            {users.map((item) => <CommandItem
              className="cursor-pointer bg-accent mb-1 py-2 w-full"
              key={item.id}
              value={JSON.stringify(item)}
              onSelect={() => {
                if(!checkUserSelected(item)) {
                  setSelectedUser(item);
                }
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  checkUserSelected(item) ? "opacity-100" : "opacity-0"
                )}
              />
              <div>
                <p className={'flex gap-x-2 items-center'}>
                  {getFullName(item, true)}
                  <UserAccountStatus status={item.status as UserStatus} onlyPoint={true}/>
                </p>
                <p className="text-xs">{item.email}</p>
              </div>
            </CommandItem>)}
          </CommandList>
        </Command>
        <div className="flex justify-end">
          <Button variant='link' onClick={()=>setSelectedUser({} as User)}>Effacer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};