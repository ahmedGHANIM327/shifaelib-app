'use client';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserSchema, updateUserSchema } from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PencilIcon, Plus } from 'lucide-react';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { Form } from '@/components/ui/form';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';

export const UpdateUserForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    startTransition(async () => {
      try {
        console.log('data', data);
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  }

  // @ts-ignore
  return (<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <AlertDialogTrigger>
      <Button className="rounded-full h-5 w-5 p-0 text-primary" variant={'ghost'}>
        <PencilIcon size={15} />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
      <DialogFormTitle
        title={'Mettre à jour cet utilisateur'}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogFormContainer>
            Mettre à jour cet utilisateur
          </DialogFormContainer>
          <DialogFormActions>
            <Button
              variant={'secondary'}
              className="md:px-16 md:w-fit w-full gap-x-2"
              onClick={handleCancel}
              type={'button'}
            >
              Pas maintenant
            </Button>
            <Button
              type="submit"
              className="md:px-16 md:w-fit w-full gap-x-2"
              disabled={isPending}
            >
              Mettre à jour
              {isPending && <LoadingSpinner size={14}/>}
            </Button>
          </DialogFormActions>
        </form>
      </Form>
    </AlertDialogContent>
  </AlertDialog>)
};