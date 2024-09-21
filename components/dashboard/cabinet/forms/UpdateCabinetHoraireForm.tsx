"use client";

import React, { FC, useState, useTransition } from 'react';
import {Button} from "@/components/ui/button";
import {PencilIcon} from "lucide-react";
import {LoadingSpinner} from "@/components/shared/components/LoadingSpinner";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { toast } from 'react-toastify';
import useCabinetStore from '@/stores/cabinet';
import { DayOpeningHours, WeekOpeningHours } from '@/lib/types';
import { DefaultOpeningHours } from '@/lib/constants';
import { HoursSelectInput } from '@/components/shared/inputs/HoursSelectInput';
import { updateOpeningHoursCabinet } from '@/server/services/cabinet';
import { Cabinet } from '@/lib/types/cabinet';

type UpdateCabinetHoraireFormProps = {
  openingHours: WeekOpeningHours;
};

export const UpdateCabinetHoraireForm:FC<UpdateCabinetHoraireFormProps> = ({ openingHours }) => {

  const setCurrentCabinet = useCabinetStore((state) => state.setCurrentCabinet);
  const [open, setOpen] = useState(false);
  const [ isPending, startTransition ] = useTransition();
  const [horaire, setHoraire] = useState<WeekOpeningHours>(openingHours);

  const handleChangeDayHours = (day: string, newOpeningHours: DayOpeningHours) => {
    setHoraire({
      ...horaire,
      [day]: newOpeningHours
    })
  }

  const handleUpdate = () => {
    startTransition(async () => {
      try {
        const response = await updateOpeningHoursCabinet(horaire);
        if(response.ok) {
          setCurrentCabinet(response.data as Cabinet);
          setOpen(false);
          // @ts-ignore
          toast.success('Vos horaires sont mis à jour avec succès.');
        } else {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  }

  const handleCancel = () => {
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button>
          <PencilIcon size={13}/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='p-0 md:w-[750px]'>
        <DialogFormTitle
          title={'Mettre à jour vos horaires'}
        />
        <div className='flex flex-col w-full px-4'>
          <HoursSelectInput
            day={'monday'}
            dayHours={
              horaire.monday
            }
            handleChange={handleChangeDayHours}
          />
          <HoursSelectInput
            day={'tuesday'}
            dayHours={
              horaire.tuesday
            }
            handleChange={handleChangeDayHours}
          />
          <HoursSelectInput
            day={'wednesday'}
            dayHours={
              horaire.wednesday
            }
            handleChange={handleChangeDayHours}
          />
          <HoursSelectInput
            day={'thursday'}
            dayHours={
              horaire.thursday
            }
            handleChange={handleChangeDayHours}
          />
          <HoursSelectInput
            day={'friday'}
            dayHours={
              horaire.friday
            }
            handleChange={handleChangeDayHours}
          />
          <HoursSelectInput
            day={'saturday'}
            dayHours={
              horaire.saturday
            }
            handleChange={handleChangeDayHours}
          />
          <HoursSelectInput
            day={'sunday'}
            dayHours={
              horaire.sunday
            }
            handleChange={handleChangeDayHours}
          />
        </div>
        <DialogFormActions>
          <Button variant={'secondary'} onClick={handleCancel}
                  className='md:w-fit md:px-16 w-full border-0'>
            Annuler
          </Button>
          <Button
            onClick={handleUpdate}
            className='md:px-16 md:w-fit w-[100%] gap-x-2'
            disabled={isPending}
          >
            Mettre à jour
            {(isPending || false) && <LoadingSpinner size={18}/>}
          </Button>
        </DialogFormActions>
      </AlertDialogContent>
    </AlertDialog>
  );
};