'use client';

import React, { FC, useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn, getFullName } from '@/lib/utils';
import useUserStore from '@/stores/user';
import { User } from '@/lib/types/users';
import { Service } from '@/lib/types/services';
import { COLORS } from '@/lib/constants';

type ServicesSelectInputProps = {
  handleChange: (service: Service) => void;
  reset?: boolean;
};

export const ServicesSelectInput:FC<ServicesSelectInputProps> = ({ handleChange, reset }) => {

  const [open, setOpen] = useState(false);
  const services = useUserStore((state) => state.cabinetServices);
  const [selectedService, setSelectedService] = useState<Service>({} as Service);

  const checkServiceSelected = (item: Service) => {
    return selectedService.id === item.id;
  }

  const SelectedTypesLabel = () => {
    if(selectedService.id) {
      return (<p className='flex items-center gap-x-2'>
        {selectedService.name}
      </p>)
    } else {
      return (<p className='flex items-center font-light'>
        Services ...
      </p>)
    }
  }

  useEffect(() => {
    handleChange(selectedService);
  }, [selectedService]);

  useEffect(() => {
    setSelectedService({} as Service);
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
            {services.map((item) => {
              const bgColor = COLORS.find(c => c.color === item.color)?.bgColor;
              return (<CommandItem
                className="cursor-pointer bg-accent mb-1 py-2 w-full"
                key={item.id}
                value={JSON.stringify(item)}
                onSelect={() => {
                  if(!checkServiceSelected(item)) {
                    setSelectedService(item);
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    checkServiceSelected(item) ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className='flex gap-x-2 items-center'>
                  <span className={`h-3 w-3 block rounded-md ${bgColor}`}></span>
                  <p>{item.name}</p>
                </div>
              </CommandItem>)
            })}
          </CommandList>
        </Command>
        <div className="flex justify-end">
          <Button variant='link' onClick={()=>setSelectedService({} as Service)}>Effacer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};