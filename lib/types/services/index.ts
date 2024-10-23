import { Cabinet } from '@/lib/types/cabinet';
import { z } from 'zod';
import { createServiceSchema } from '@/lib/schemas/services';
import { Treatment } from '@/lib/types/patients/treatments';

export type Service = {
  id: string;
  name: string;
  color: string;
  tarif: string;
  duration: string;
  config?: object;
  createdAt: Date;
  updatedAt?: Date;
  //Relations
  cabinet?: Cabinet;
  treatments?: Treatment[];
};

export type AdditionalQuestionType = {
  id: string;
  label: string;
  type: 'text' | 'select' | 'text_select' | 'uniq_select' | 'text_uniq_select';
  options: string[];
  value: string[];
  additionalValue?: string;
  order: number;
}

export type CreateOrUpdateServiceInput = z.infer<typeof createServiceSchema>;