import React, { FC, useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn, getFullName } from '@/lib/utils';
import useUserStore from '@/stores/user';
import { User } from '@/lib/types/users';
import { COLORS } from '@/lib/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { UserAccountStatus } from '@/components/dashboard/user/components/UserAccountStatus';
import { UserStatus } from '@/lib/types';

type UsersMultiselectInputProps = {
  handleChange: (users: User[]) => void;
  reset?: boolean;
  modal?: boolean;
};

export const UsersMultiselectInput:FC<UsersMultiselectInputProps> = ({ handleChange, reset, modal = true }) => {

  const [open, setOpen] = useState(false);
  const users = useUserStore((state) => state.cabinetUsers);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const checkUserSelected = (item: User) => {
    for (let index in selectedUsers) {
      if(selectedUsers[index].id === item.id) return true;
    }
    return false;
  }

  const SelectedTypesLabel = () => {
    if(selectedUsers && selectedUsers.length !== 0) {
      return (<p className='flex items-center gap-x-2'>
        {selectedUsers.length > 0 && <div className='flex gap-x-1'>
          <span className="bg-primary text-white rounded-md py-0 p-2 flex justify-center items-center">{getFullName(selectedUsers[0], true)}</span>
          {selectedUsers.length > 1 && <span className="bg-primary text-white rounded-md py-0 p-2 flex justify-center items-center">+{selectedUsers.length-1}</span>}
        </div>}
      </p>)
    } else {
      return (<p className='flex items-center font-light'>
        Utilisateurs ...
      </p>)
    }
  }

  useEffect(() => {
    handleChange(selectedUsers);
  }, [selectedUsers]);

  useEffect(() => {
    setSelectedUsers([]);
  }, [reset]);

  if(!modal) {
    return (<div className="pl-2 w-full">
      <p className={'font-mono text-primary mb-2'}>Praticiens</p>
      <div className="w-full flex flex-col max-h-[300px] overflow-y-auto pr-2">
        {users.map((s) => {
          return (<div
            key={s.id}
            className="rounded-md flex items-center pl-2 gap-x-2 mb-2 text-sm"
          >
            <Checkbox
              checked={checkUserSelected(s)}
              onCheckedChange={(checked) => {
                return checked
                  ? setSelectedUsers([...selectedUsers, s])
                  : setSelectedUsers(
                    selectedUsers.filter(
                      (value) => value.id !== s.id
                    )
                  );
              }}
              className={cn(`h-4 w-4`)}
            />
            {getFullName(s)}</div>);
        })}
      </div>
    </div>)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={'justify-between w-full'}
        >
          <SelectedTypesLabel />
          <ChevronsUpDown size={13} className={'opacity-50'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'p-0 min-w-[300px] w-full'}>
        <Command>
          <CommandList>
            <CommandEmpty>Pas de résultats.</CommandEmpty>
            {users.map((item) => <CommandItem
              className="cursor-pointer bg-accent mb-1 py-2 w-full"
              key={item.id}
              value={JSON.stringify(item)}
              onSelect={() => {
                if (checkUserSelected(item)) {
                  const newValues = selectedUsers.filter((user) => user.id != item.id);
                  setSelectedUsers(newValues);
                } else {
                  setSelectedUsers([...selectedUsers, item]);
                }
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  checkUserSelected(item) ? 'opacity-100' : 'opacity-0'
                )}
              />
              <div>
                <p className={'flex gap-x-2 items-center'}>
                  {getFullName(item, true)}
                  <UserAccountStatus status={item.status as UserStatus} onlyPoint={true} />
                </p>
                <p className="text-xs">{item.email}</p>
              </div>
            </CommandItem>)}
          </CommandList>
        </Command>
        <div className="flex justify-end">
          <Button variant='link' onClick={()=>setSelectedUsers([])}>Effacer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};