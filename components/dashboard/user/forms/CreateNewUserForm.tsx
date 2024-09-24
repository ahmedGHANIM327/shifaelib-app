import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateCabinetSchema } from '@/lib/schemas/cabinet';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCabinet } from '@/server/services/cabinet';
import { Cabinet, UpdateCabinetInput } from '@/lib/types/cabinet';
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PencilIcon, Plus } from 'lucide-react';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { Input } from '@/components/ui/input';
import { CabinetTypeSelect } from '@/components/shared/inputs/CabinetTypeSelect';
import { Textarea } from '@/components/ui/textarea';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { createUserSchema } from '@/lib/schemas/users';

export const CreateNewUserForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
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
    <AlertDialogTrigger className={'w-full'}>
      <Button className='gap-x-2 w-full'>
        <Plus />
        Créer un utilisateur
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
      <DialogFormTitle
        title={'Créer un nouveau utilisateur'}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogFormContainer>
            here form content
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
              Créer
              {isPending && <LoadingSpinner size={14}/>}
            </Button>
          </DialogFormActions>
        </form>
      </Form>
    </AlertDialogContent>
  </AlertDialog>)
};