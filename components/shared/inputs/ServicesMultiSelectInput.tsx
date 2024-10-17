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
import { Checkbox } from '@/components/ui/checkbox';

type ServicesSelectInputProps = {
  handleChange: (service: Service[]) => void;
  reset?: boolean;
  modal?: boolean;
};

export const ServicesMultiSelectInput:FC<ServicesSelectInputProps> = ({ handleChange, reset, modal = true }) => {

  const [open, setOpen] = useState(false);
  const services = useUserStore((state) => state.cabinetServices);
  const [selectedServices, setSelectedServices] = useState<Service[]>([] as Service[]);

  const checkServiceSelected = (item: Service) => {
    for (let index in selectedServices) {
      if(selectedServices[index].id === item.id) return true;
    }
    return false;
  }

  const SelectedTypesLabel = () => {
    if(selectedServices && selectedServices.length !== 0) {
      return (<p className='flex items-center gap-x-2'>
        {selectedServices.length > 0 && <div className='flex gap-x-1'>
          <span className="bg-primary text-white rounded-md py-0 p-2 flex justify-center items-center">{selectedServices[0].name}</span>
          {selectedServices.length > 1 && <span className="bg-primary text-white rounded-md py-0 p-2 flex justify-center items-center">+{selectedServices.length-1}</span>}
        </div>}
      </p>)
    } else {
      return (<p className='flex items-center font-light'>
        Services ...
      </p>)
    }
  }

  useEffect(() => {
    handleChange(selectedServices);
  }, [selectedServices]);

  useEffect(() => {
    setSelectedServices([] as Service[]);
  }, [reset]);

  if(!modal) {
    return (<div className='pl-2 w-full'>
      <p className={'font-mono text-primary mb-2'}>Services</p>
      <div className="w-full flex flex-col max-h-[300px] overflow-y-auto pr-2">
        {services.map((s) => {
          //const color = getColorsWithLevels(s.color);
          const bgColor = COLORS.find(c => c.color === s.color)?.bgColor;
          const bgLightColor = COLORS.find(c => c.color === s.color)?.bgLightColor;
          const borderColor = COLORS.find(c => c.color === s.color)?.borderColor;
          const textLightColor = COLORS.find(c => c.color === s.color)?.textLightColor;
          return (<div
            key={s.id}
            className="rounded-md flex items-center pl-2 gap-x-2 mb-2 text-sm"
          >
            <Checkbox
              checked={checkServiceSelected(s)}
              onCheckedChange={(checked) => {
                return checked
                  ? setSelectedServices([...selectedServices, s])
                  : setSelectedServices(
                    selectedServices.filter(
                      (value) => value.id !== s.id
                    )
                  );
              }}
              className={cn(`h-4 w-4 ${textLightColor} ${borderColor} ${bgLightColor} data-[state=checked]:${bgColor}`,
                checkServiceSelected(s) && `${bgColor}`)}
            />
            {s.name}</div>);
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
            {services.map((item) => {
              const bgColor = COLORS.find(c => c.color === item.color)?.bgColor;
              return (<CommandItem
                className="cursor-pointer bg-accent mb-1 py-2 w-full"
                key={item.id}
                value={JSON.stringify(item)}
                onSelect={() => {
                  if (checkServiceSelected(item)) {
                    const newValues = selectedServices.filter((s) => s.id != item.id);
                    setSelectedServices(newValues);
                  } else {
                    setSelectedServices([...selectedServices, item]);
                  }
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
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
          <Button variant='link' onClick={()=>setSelectedServices([] as Service[])}>Effacer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};