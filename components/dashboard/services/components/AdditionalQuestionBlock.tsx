import React, { FC } from 'react';
import { AdditionalQuestionType } from '@/lib/types/services';
import { Dot } from 'lucide-react';
import { convertTypeQuestion } from '@/lib/utils';

export const AdditionalQuestionBlock:FC<{question: AdditionalQuestionType}> = ({ question }) => {
  return (
    <div className='w-full flex flex-wrap gap-y-1 border mt-4 flex-col pl-2 py-2'>
      <p className={'font-semibold font-mono text-primary'}>{question.label}</p>
      <p className={'text-sm flex items-center gap-x-2'}>
        <Dot size={15} />
        <span className='font-semibold'>Type de question : </span>
        <span>{convertTypeQuestion(question.type)}</span>
      </p>
      {question.type !== 'text' && <p className={'text-sm flex items-center gap-x-2'}>
        <Dot size={15} />
        <span className='font-semibold'>Options de réponse : </span>
        <span>{question.options.join(', ')}</span>
      </p>}
    </div>
  );
};