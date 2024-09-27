import { Cabinet } from '@/lib/types/cabinet';
import { z } from 'zod';
import { createServiceSchema } from '@/lib/schemas/services';

export type Service = {
  id: string;
  name: string;
  color: string;
  tarif: string;
  config?: object;
  //Relations
  cabinet?: Cabinet;
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

export type CreateServiceInput = z.infer<typeof createServiceSchema>;