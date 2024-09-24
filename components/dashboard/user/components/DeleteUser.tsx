'use client';

import React, { FC, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types/users';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { getFullName } from '@/lib/utils';

export const DeleteUser:FC<{ user:User }> = ({ user }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button className="rounded-full h-5 w-5 p-0 text-destructive" variant={'ghost'}>
          <TrashIcon size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] px-6">
        <h2 className='text-2xl font-semibold text-primary'>Supprimer - {getFullName(user)}</h2>
        <h3>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
        </h3>
        <DialogFormActions
          className='border-none'
        >
          <Button
            variant={'secondary'}
            className="md:px-16 md:w-fit w-full gap-x-2"
            onClick={()=>setIsOpen(false)}
          >
            Pas maintenant
          </Button>
          <Button
            type="submit"
            variant={'destructive'}
            className="md:px-16 md:w-fit w-full gap-x-2"
          >
            Supprimer
          </Button>
        </DialogFormActions>
      </AlertDialogContent>
    </AlertDialog>
  );
};