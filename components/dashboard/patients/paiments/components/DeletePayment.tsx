'use client';

import React, { FC, useState, useTransition } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { cn } from '@/lib/utils';
import usePaymentStore from '@/stores/patient/payment';
import { deletePayment } from '@/server/services/patients/paiments';
import { Payment } from '@/lib/types/patients/paiments';

export const DeletePayment:FC<{ id: string }> = ({ id }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // state
  const setPaymentState = usePaymentStore((state) => state.setState);

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const response = await deletePayment(id);
        if(response.ok) {
          if(response.data!.sessionId) {
            setPaymentState('SESSION_PAYMENT_DELETED', response.data as Payment);
          } else {
            setPaymentState('PAYMENT_DELETED', response.data as Payment);
          }
          setIsOpen(false);
          // @ts-ignore
          toast.success('Paiement supprimé avec succès');
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
        <TrashIcon size={15} className={cn('text-destructive')}/>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] px-6">
        <h2 className='text-2xl font-semibold text-primary'>Supprimer - Paiement</h2>
        <h3>
          Êtes-vous sûr de vouloir supprimer ce paiement ? Cette action est irréversible.
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