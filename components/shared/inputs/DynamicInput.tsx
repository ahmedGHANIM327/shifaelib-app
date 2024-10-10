import React, { FC, useEffect } from 'react';
import { AdditionalQuestionType } from '@/lib/types/services';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import debounce from 'debounce';
import { CheckedState } from '@radix-ui/react-checkbox';

type DynamicInputProps = {
  question: AdditionalQuestionType;
  disabled: boolean;
  handleChange:(id: string, newData: AdditionalQuestionType) => void;
};
export const DynamicInput:FC<DynamicInputProps> = ({ question, disabled = false, handleChange }) => {

  const handleChangeAdditionalValue = (value: string) => {
    handleChange(question.id, {
      ...question,
      additionalValue: value || '',
    })
  }

  const handleChangeValue = (value: string) => {
    handleChange(question.id, {
      ...question,
      value: [value],
    })
  }

  const handleChangeCheck = (checked: CheckedState, option: string) => {
    return checked
      ? handleChange(question.id, {...question, value: (question?.value || []).concat(option) || [],})
      : handleChange(question.id, {...question, value: (question?.value as string[]).filter(
          (value) => value !== option
        ) || [],}
      )
  }

  const debouncedHandleAdditionalValue = debounce(handleChangeAdditionalValue, 300);
  const debouncedHandleValue = debounce(handleChangeValue, 300);

  if(question.type === 'text') {
    return (<div className='w-full flex items-center gap-x-2 flex-wrap gap-y-2'>
      <p className={'min-w-[250px] font-semibold font-mono text-primary'}>{question.label}</p>
      <Textarea
        placeholder={question.label}
        defaultValue={question.value.join('')}
        onChange={(e)=>debouncedHandleValue(e.target.value)}
        disabled={disabled}
        className={'disabled:opacity-100 disabled:cursor-text'}
      />
    </div>);
  }

  if(question.type === 'select') {
    return (<div className='flex items-center gap-x-4 flex-wrap gap-y-2'>
      <p className={'min-w-[250px] font-semibold font-mono text-primary'}>{question.label}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {(question.options || []).map((option, index) => {
          return (<div key={index} className='flex items-center gap-x-2 flex-nowrap'>
            <Checkbox id="terms" onCheckedChange={(checked) => {
              return handleChangeCheck(checked, option);
            }}
                      checked={question.value.includes(option)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>)
        })}
      </div>
    </div>)
  }

  if(question.type === 'text_select') {
    return (<div className='flex items-center gap-x-4 flex-wrap w-full'>
      <p className={'min-w-[250px] font-semibold font-mono text-primary'}>{question.label}</p>
      <div className='flex flex-wrap gap-x-4 gap-y-2 mt-2'>
        {(question.options || []).map((option, index) => {
          return (<div key={index} className='flex items-center gap-x-2 flex-nowrap'>
            <Checkbox id="terms" onCheckedChange={(checked) => {
              return checked
                ? handleChange(question.id, {...question, value: (question?.value || []).concat(option) || [],})
                : handleChange(question.id, {...question, value: (question.value as string[]).filter(
                    (value) => value !== option
                  ) || [],}
                )
            }}
                      checked={(question?.value || []).includes(option)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>)
        })}
      </div>
      <Textarea
        placeholder={'Completer votre réponse'}
        defaultValue={question?.additionalValue}
        onChange={(e)=>debouncedHandleAdditionalValue(e.target.value)}
        disabled={disabled}
        className={'mt-2 w-full disabled:opacity-100 disabled:cursor-text'}
      />
    </div>)
  }

  if(question.type === 'uniq_select') {
    return (<div className='flex items-center gap-x-4 flex-wrap gap-y-2'>
      <p className={'min-w-[250px] font-semibold font-mono text-primary'}>{question.label}</p>
      <div className='flex flex-wrap gap-x-4 gap-y-2'>
        <RadioGroup
          className={'flex gap-x-4'}
          onValueChange={(value:string)=>handleChange(question.id, {...question, value: [value]})}
          defaultValue={(question.value as string[]).join('') || ''}
        >
          {(question.options || []).map((option, index) => {
            return (<div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} disabled={disabled} className={'disabled:opacity-100 disabled:cursor-text'}/>
              <Label htmlFor={option}>{option}</Label>
            </div>)
          })}
        </RadioGroup>
      </div>
    </div>)
  }

  if(question.type === 'text_uniq_select') {
    return (<div className='flex items-center gap-x-4 flex-wrap gap-y-2'>
      <p className={'min-w-[250px] font-semibold font-mono text-primary'}>{question.label}</p>
      <div className='flex flex-wrap gap-x-4 gap-y-2'>
        <RadioGroup
          className={'flex gap-x-4'}
          onValueChange={(value:string)=>handleChange(question.id, {...question, value: [value]})}
          defaultValue={(question.value as string[]).join('') || ''}
        >
          {(question.options || []).map((option, index) => {
            return (<div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} disabled={disabled} className={'disabled:opacity-100 disabled:cursor-text'}/>
              <Label htmlFor={option}>{option}</Label>
            </div>)
          })}
        </RadioGroup>
      </div>
      <Textarea
        placeholder={'Completer votre réponse'}
        onChange={(e)=>debouncedHandleAdditionalValue(e.target.value)}
        disabled={disabled}
        className={'mt-2 w-full disabled:opacity-100 disabled:cursor-text'}
      />
    </div>)
  }

  return (
    <div>
      {question.label}
    </div>
  );
};