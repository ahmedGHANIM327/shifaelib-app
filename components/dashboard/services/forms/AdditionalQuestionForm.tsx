'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { additionalQuestionTypeSchema } from '@/lib/schemas/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {InputTags} from '@/components/shared/inputs/InputTags';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { v4 as uuidv4 } from 'uuid';
import { AdditionalQuestionType } from '@/lib/types/services';
import { PencilIcon } from 'lucide-react';

type AdditionalQuestionFormProps = {
  type: 'create' | 'update';
  selectedAdditionalQuestion?: AdditionalQuestionType;
  additionalQuestions: AdditionalQuestionType[];
  setAdditionalQuestions: (additionalQuestions: AdditionalQuestionType[]) => void;
}

export const AdditionalQuestionForm:FC<AdditionalQuestionFormProps> = ({
  type = 'create',
                                                                         selectedAdditionalQuestion,
  additionalQuestions,
  setAdditionalQuestions
                                                                       }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // @ts-ignore
  const form = useForm<z.infer<typeof additionalQuestionTypeSchema>>({
    resolver: zodResolver(additionalQuestionTypeSchema),
    defaultValues: type==='update' ? {
      label: selectedAdditionalQuestion?.label,
      options: selectedAdditionalQuestion?.options,
      type: selectedAdditionalQuestion?.type
    } : {
      label: '',
      options: [],
      type: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof additionalQuestionTypeSchema>) => {
    const { success } = additionalQuestionTypeSchema.safeParse(data);
    if(success) {
      if(type === 'create') {
        // @ts-ignore
        const question: AdditionalQuestionType = {
          id: uuidv4(),
          ...data,
          value: [],
          order: additionalQuestions.length+1
        }
        setAdditionalQuestions([...additionalQuestions, question]);
      } else {
        const id = selectedAdditionalQuestion?.id as string;
        const filteredQuestions = additionalQuestions.filter(q => q.id !== id);
        // @ts-ignore
        const updatedQuestion: AdditionalQuestionType = {
          ...selectedAdditionalQuestion,
          ...data,
        }
        setAdditionalQuestions([...filteredQuestions, updatedQuestion]);
      }
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  }

  const TriggerComponent = () => {
    if(type === 'create') {
      return (<AlertDialogTrigger className='text-primary underline'>
        Ajouter
      </AlertDialogTrigger>)
    }
    return (<AlertDialogTrigger className='text-primary'>
      <PencilIcon size={13}/>
    </AlertDialogTrigger>)
  }

  // @ts-ignore
  const typeQuestion = form.watch('type');

  // @ts-ignore
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TriggerComponent />
      <AlertDialogContent className="md:w-[550px] md:max-w-[850px] p-0">
        <DialogFormTitle
          title={type === 'create' ? 'Ajouter une nouvelle question' : 'Mettre à jour la question'}
        />
        <Form {...form}>
          <form className="space-y-4">
            <DialogFormContainer className='flex flex-col gap-4 pt-0'>
              <div className='flex flex-col gap-y-2'>
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="w-[100%] gap-y-0">
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input placeholder="Question" defaultValue={field.value} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-[100%] gap-y-0">
                      <FormLabel>Type de question</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Type de question" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="select">Options à choix multiple</SelectItem>
                          <SelectItem value="text_select">Options à choix multiple avec réponse complementaire</SelectItem>
                          <SelectItem value="uniq_select">Options à choix unique</SelectItem>
                          <SelectItem value="text_uniq_select">Options à choix unique avec réponse complementaire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {typeQuestion !== 'text' && <FormField
                  control={form.control}
                  name="options"
                  render={({ field }) => (
                    <FormItem className="w-[100%] gap-y-0">
                      <FormLabel>Options de résponses</FormLabel>
                      <FormControl>
                        <InputTags
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder={'Options de résponses...'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />}
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
                type="button"
                className="md:px-16 md:w-fit w-full gap-x-2"
                onClick={form.handleSubmit(onSubmit)}
              >
                {type === 'create' ? 'Créer' : 'Mettre à jour'}
              </Button>
            </DialogFormActions>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};