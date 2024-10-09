'use client';
import React, { FC, useState } from 'react';
import { DialogFormTitle } from '@/components/shared/components/DialogFormTitle';
import { DialogFormContainer } from '@/components/shared/components/DialogFormContainer';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { cn } from '@/lib/utils';
import { COLORS } from '@/lib/constants';
import { DynamicInput } from '@/components/shared/inputs/DynamicInput';

type AdditionalQuestionsFicheModalProps = {
  service: Service;
}

export const AdditionalQuestionsFicheModal:FC<AdditionalQuestionsFicheModalProps> = ({ service }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if(!service || (service && (service.config as AdditionalQuestionType[]).length === 0)) {
    return '-'
  }

  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textLightColor!;
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className='text-primary underline'>
        Fiche
      </DialogTrigger>
      <DialogContent className={cn("md:w-[550px] md:max-w-[850px] p-0 ")}>
        <DialogFormTitle
          title={'Questions supplémentaires'}
          className={bgColor}
          titleClassName={textColor}
        />
        <DialogFormContainer className='flex flex-col gap-y-6 pt-0 overflow-hidden'>
          {(service.config as AdditionalQuestionType[] || []).map((question: AdditionalQuestionType) => <DynamicInput key={question.id}
                                                                                                                      question={question}
                                                                                                                      disabled={true}
                                                                                                                      handleChange={()=>console.log('')}
          />)}
        </DialogFormContainer>
      </DialogContent>
    </Dialog>
  );
};
