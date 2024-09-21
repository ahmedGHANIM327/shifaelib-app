import React, {FC, useEffect, useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {HoursAndMinutesList} from "@/lib/constants";
import {DayOpeningHours} from "@/lib/types";
import {translateDays} from "@/lib/constants";
import { CheckedState } from '@radix-ui/react-checkbox';
import { Checkbox } from '@/components/ui/checkbox';

type HoursSelectInputProps = {
  day: string;
  dayHours: DayOpeningHours;
  handleChange: (day: string, newOpeningHours: DayOpeningHours) => void;
}

export const HoursSelectInput:FC<HoursSelectInputProps> = ({ day, dayHours, handleChange }) => {

  const [horaire, setHoraire] = useState<DayOpeningHours>(dayHours);

  useEffect(() => {
    handleChange(day, horaire);
  }, [horaire]);

  return (
    <div className='w-full grid grid-cols-4  gap-x-1 md:gap-x-2 h-12'>
                <span className='font-semibold h-full flex items-center'>
                    {translateDays[day as keyof typeof translateDays]}
                </span>
      {!dayHours?.isClosed && <>
        <div className='flex items-center'>
          <Select
            defaultValue={dayHours.from}
            onValueChange={(newValue: string) => {
              setHoraire({
                ...horaire,
                from: newValue
              })
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={'Du'}/>
            </SelectTrigger>
            <SelectContent>
              {HoursAndMinutesList.map((hour) => <SelectItem value={hour}
                                                             key={hour}>{hour}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center'>
          <Select
            defaultValue={dayHours.to}
            onValueChange={(newValue: string) => {
              setHoraire({
                ...horaire,
                to: newValue
              })
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={'Du'}/>
            </SelectTrigger>
            <SelectContent>
              {HoursAndMinutesList.map((hour) => <SelectItem value={hour}
                                                             key={hour}>{hour}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </>}
      <div className="flex items-center space-x-2 md:ml-2">
        <Checkbox
          id="closed"
          checked={dayHours.isClosed}
          onCheckedChange={(isClosed: CheckedState) => {
            setHoraire({
              ...horaire,
              isClosed: isClosed as boolean
            })
          }}
        />
        <label
          htmlFor="closed"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Fermé
        </label>
      </div>
    </div>
  );
};