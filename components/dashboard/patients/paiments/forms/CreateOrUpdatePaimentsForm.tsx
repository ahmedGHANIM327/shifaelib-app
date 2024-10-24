'use client';

import React, { FC, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { createOrUpdatePaymentSchema } from '@/lib/schemas/patients/paiments';
import { CreateOrUpdatePaymentInput, Payment } from '@/lib/types/patients/paiments';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CreateOrUpdateTreatmentInput } from '@/lib/types/patients/treatments';
import { createTreatment } from '@/server/services/patients/treatments';
import { toast } from 'react-toastify';
import { createPayment } from '@/server/services/patients/paiments';
import usePaymentStore from '@/stores/patient/payment';

type CreateOrUpdatePaimentsFormProps = {
  treatmentId: string;
  sessionId?: string;
  date?: Date;
  amount?: string;
  type: 'create' | 'update';
  isFiche?: boolean;
}

export const CreateOrUpdatePaimentsForm:FC<CreateOrUpdatePaimentsFormProps> = (props) => {

  const {
    treatmentId,
    sessionId,
    date,
    amount,
    type = 'create',
    isFiche = false
  } = props;

  const setPaymentState = usePaymentStore((state) => state.setState);

  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createOrUpdatePaymentSchema>>({
    resolver: zodResolver(createOrUpdatePaymentSchema),
    defaultValues: {
      date: format(date || new Date(), 'yyyy-MM-dd HH:mm').replace(' ', 'T'),
      amount: amount || ''
    }
  });

  const handleCreate = async (data: CreateOrUpdatePaymentInput) => {
    const response = await createPayment(data);
    if(response.ok) {
      if(sessionId) {
        setPaymentState('SESSION_PAYMENT_CREATED', response.data as Payment);
      } else {
        setPaymentState('PAYMENT_CREATED', response.data as Payment);
      }
      form.reset();
      setIsDialogOpen(false);
      // @ts-ignore
      toast.success('Paiement ajouté avec succès');
    } else {
      // @ts-ignore
      toast.error('Une erreur est servenue. Veuillez réessayer.');
    }
  }

  const onSubmit = async (data: z.infer<typeof createOrUpdatePaymentSchema>) => {
    startTransition(async () => {
      const dataPaiment = {
        ...data,
        treatmentId,
        sessionId
      } as CreateOrUpdatePaymentInput;
      if(type === 'create') {
        await handleCreate(dataPaiment);
      }
    });
  };

  const handleCancel = () => {
    form.reset();
    setIsDialogOpen(false);
  }

  const TriggerComponent = () => {
    if(isFiche) {
      return (<AlertDialogTrigger type={'button'} className={cn('gap-x-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2')}>
        <Plus size={13}/>
      </AlertDialogTrigger>)
    } else {
      return (<AlertDialogTrigger type={'button'} className={cn('bg-primary text-white flex w-full items-center justify-center gap-x-2 py-2 rounded-md text-sm font-medium')}>
        <Plus size={17}/>
        Ajouter un paiement
      </AlertDialogTrigger>)
    }
  }

  // @ts-ignore
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TriggerComponent />
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] p-0">
        <DialogFormTitle
          title={'Ajouter un paiement'}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogFormContainer className="flex flex-col gap-4 pt-0">
              <div className={'flex flex-wrap justify-between'}>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Début de séance</FormLabel>
                      <FormControl>
                        <Input type={'datetime-local'} {...field} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="md:w-[49%] w-[100%] gap-y-0">
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input placeholder="Total" {...field} type={'number'} min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogFormContainer>
            <DialogFormActions>
              <Button
                variant={'secondary'}
                className="md:px-16 md:w-fit w-full gap-x-2"
                type={'button'}
                onClick={handleCancel}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="md:px-16 md:w-fit w-full gap-x-2"
                disabled={isPending}
              >
                Créer
                {isPending && <LoadingSpinner size={14} />}
              </Button>
            </DialogFormActions>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
