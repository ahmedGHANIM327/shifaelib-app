import { Cabinet } from '@/lib/types/cabinet';

export type Service = {
  id: string;
  name: string;
  color: string;
  tarif: string;
  config?: object;
  //Relations
  cabinet?: Cabinet;
};