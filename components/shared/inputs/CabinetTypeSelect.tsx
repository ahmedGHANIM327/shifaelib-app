"use client"

import * as React from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  Command
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import {cn} from "@/lib/utils";
import {MedicalCabinetTypes} from "@/lib/constants";
import {transformArrayToTypeOptions} from "@/lib/utils";

type CabinetTypeSelectPropsType = {
  handleChange:(type: string) => void;
  type:string
}

export const CabinetTypeSelect:React.FC<CabinetTypeSelectPropsType> = (props) => {
  const {
    handleChange,
    type
  } = props;
  const [open, setOpen] = useState(false);
  const typeOptions = transformArrayToTypeOptions(MedicalCabinetTypes);

  const [selectedType, setSelectedType] = useState<string>(type);

  useEffect(() => {
    handleChange(selectedType);
    setOpen(false);
  },[selectedType]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          <p className="flex items-center gap-x-4">
            {selectedType ? selectedType : 'Spécialité...' }
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command className='h-[300px]'>
          <CommandInput placeholder="Spécialité..."/>
          <CommandList>
            <CommandEmpty>Pas de Patient trouvé.</CommandEmpty>
            {typeOptions && typeOptions.map((item: any) => <CommandItem
              className="cursor-pointer"
              key={item.value}
              value={item.value}
              onSelect={(currentValue: string) => {
                setSelectedType(currentValue)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedType === item.value ? "opacity-100" : "opacity-0"
                )}
              />
              {item.label}</CommandItem>)}
          </CommandList>
        </Command>
        <div className="flex justify-end">
          <Button variant='link' onClick={() => setSelectedType('')}>Effacer</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}