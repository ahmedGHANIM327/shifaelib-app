'use client';

import React, { FC, useTransition } from 'react';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import useSessionStore from '@/stores/patient/sessions';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { deleteSession } from '@/server/services/sessions';
import { XIcon } from 'lucide-react';

export const DeleteSessionComponent = () => {

  const viewAgendaSession = useSessionStore((state) => state.viewAgendaSession);
  const setViewAgendaSession = useSessionStore((state) => state.setViewAgendaSession);

  const setIsOpen = (open: boolean):void => {
    setViewAgendaSession({
      ...viewAgendaSession,
      open
    })
  };

  const handleBack = () => {
    setViewAgendaSession({
      ...viewAgendaSession,
      type: 'view'
    })
  };

  const handleClose = () => {
    setViewAgendaSession({
      ...viewAgendaSession,
      open: false
    })
  };

  const [isPending, startTransition] = useTransition();

  // state
  const setSessionState = useSessionStore((state) => state.setState);

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const response = await deleteSession(viewAgendaSession.data.id);
        if(response.ok) {
          setSessionState('SESSION_DELETED', viewAgendaSession.data.id);
          // @ts-ignore
          toast.success('Traitement supprimé avec succès');
        } else {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      } finally {
        handleClose();
      }
    });
  }

  return (
    <AlertDialog open={viewAgendaSession.open && viewAgendaSession.type === 'delete'} onOpenChange={setIsOpen}>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] px-6">
        <div className='flex justify-end mb-0'>
          <Button variant={'link'} className={`bg-destructive text-white p-0 h-fit w-fit`} onClick={handleClose}>
            <XIcon size={15} />
          </Button>
        </div>
        <h2 className='text-2xl font-semibold text-primary'>Supprimer - Séance ({format(viewAgendaSession.data.startTime, "dd LLL y", { locale: fr })} {format(viewAgendaSession.data.startTime, "HH:mm", { locale: fr })} - {format(viewAgendaSession.data.endTime, "HH:mm", { locale: fr })})</h2>
        <h3>
          Êtes-vous sûr de vouloir supprimer cette séance ? Cette action est irréversible.
        </h3>
        <DialogFormActions
          className='border-none'
        >
          <Button
            variant={'secondary'}
            className="md:px-16 md:w-fit w-full gap-x-2"
            onClick={handleBack}
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