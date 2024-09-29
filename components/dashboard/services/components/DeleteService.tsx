'use client';

import React, { FC, useState, useTransition } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Service } from '@/lib/types/services';
import { deleteService as deleteServiceAction} from '@/server/services/services';
import { cn } from '@/lib/utils';
import useUserStore from '@/stores/user';

export const DeleteService:FC<{ service:Service; iconeClassName?: string; }> = ({ service, iconeClassName }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const deleteService = useUserStore((state) => state.deleteCabinetUser);

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const response = await deleteServiceAction(service.id);
        if(response.ok) {
          deleteService(service.id);
          setIsOpen(false);
          // @ts-ignore
          toast.success('Service supprimé avec succès');
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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <TrashIcon size={15} className={cn('text-destructive', iconeClassName)}/>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] px-6">
        <h2 className='text-2xl font-semibold text-primary'>Supprimer - {service.name}</h2>
        <h3>
          Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.
        </h3>
        <DialogFormActions
          className='border-none'
        >
          <Button
            variant={'secondary'}
            className="md:px-16 md:w-fit w-full gap-x-2"
            onClick={()=>setIsOpen(false)}
          >
            Annuler
          </Button>
          <Button
            variant={'destructive'}
            className="md:px-16 md:w-fit w-full gap-x-2"
            onClick={handleDelete}
            disabled={isPending}
          >
            Supprimer
            {isPending && <LoadingSpinner size={14} />}
          </Button>
        </DialogFormActions>
      </AlertDialogContent>
    </AlertDialog>
  );
};