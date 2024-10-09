import React, { FC } from 'react';
import { AdditionalQuestionType } from '@/lib/types/services';
import { DynamicInput } from '@/components/shared/inputs/DynamicInput';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { cn, getFullName } from '@/lib/utils';

export const TreatmentAdditionalData:FC<{ data: AdditionalQuestionType[] }> = ({ data }) => {

  if(!data || data.length === 0) {
    return '-';
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className={cn('px-0 w-fit underline text-foreground')}>Données</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 flex flex-col gap-6">
      {data.map((question: AdditionalQuestionType) => <DynamicInput key={question.id}
                                                                                                                  question={question}
                                                                                                                  disabled={true}
                                                                                                                  handleChange={()=>console.log('')}
      />)}
      </HoverCardContent>
    </HoverCard>
  );
};