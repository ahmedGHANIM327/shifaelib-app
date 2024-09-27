'use client';

import React, { FC, useState, useTransition } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogFormActions } from '@/components/shared/components/DialogFormActions';
import { AdditionalQuestionType } from '@/lib/types/services';

type DeleteAdditionalQuestionProps = {
  question: AdditionalQuestionType;
  additionalQuestions: AdditionalQuestionType[];
  setAdditionalQuestions: (additionalQuestions: AdditionalQuestionType[]) => void;
}

export const DeleteAdditionalQuestion:FC<DeleteAdditionalQuestionProps> = ({ question, additionalQuestions,setAdditionalQuestions }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const id = question?.id as string;
    const filteredQuestions = additionalQuestions.filter(q => q.id !== id);
    setAdditionalQuestions(filteredQuestions);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button className="rounded-full h-5 w-5 p-0 text-destructive hover:text-destructive" variant={'ghost'}>
          <TrashIcon size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-[700px] md:max-w-[850px] px-6">
        <h2 className='text-2xl font-semibold text-primary'>Supprimer la question - {question.label}</h2>
        <DialogFormActions
          className='border-none'
        >
          <Button
            variant={'secondary'}
            className="md:px-16 md:w-fit w-full gap-x-2"
            onClick={()=>setIsOpen(false)}
            type={'button'}
          >
            Annuler
          </Button>
          <Button
            variant={'destructive'}
            type={'button'}
            className="md:px-16 md:w-fit w-full gap-x-2"
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </DialogFormActions>
      </AlertDialogContent>
    </AlertDialog>
  );
};