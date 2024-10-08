import React, { FC } from 'react';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { Card } from '@/components/ui/card';
import { COLORS } from '@/lib/constants';
import { cn, convertDurationToLabel, convertGender, stringifyDateFormat } from '@/lib/utils';
import {
  AdditionalQuestionsFicheModal
} from '@/components/dashboard/services/components/AdditionalQuestionsFicheModal';
import { CreateOrUpdateServiceForm } from '@/components/dashboard/services/forms/CreateOrUpdateServiceForm';
import { DeleteService } from '@/components/dashboard/services/components/DeleteService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const ServiceCardLisiting:FC<{ service: Service }> = ( {service}) => {
  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textLightColor!;
  return (
    <Card>
      <div className={cn(bgColor, textColor, 'text-center py-2 rounded-t-md relative')}>
        {service.name}
        <div className={'flex w-fit gap-x-2 absolute top-[50%] right-2 -translate-y-[50%]'}>
          <CreateOrUpdateServiceForm type={'update'} service={service} iconeClassName={textColor}/>
          <DeleteService service={service} iconeClassName={textColor}/>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-y-2 gap-x-4 flex-wrap">
        <div className="flex gap-x-4">
          <p className="font-semibold">Tarif de la séance</p>
          <p>{service.tarif}</p>
        </div>
        <div className="flex gap-x-4">
          <p className="font-semibold">Durée moyenne de la séance</p>
          <p>{convertDurationToLabel(service.duration)}</p>
        </div>
        <div className="flex gap-x-4">
          <p className="font-semibold">Questions supplémentaires</p>
          {(service.config as AdditionalQuestionType[]).length > 0 ? <AdditionalQuestionsFicheModal service={service} /> : '-'}
        </div>
      </div>
      {<div className="flex-col flex items-end p-2">
        <p className="text-xs">Crée le {service.createdAt && format(new Date(service.createdAt), "dd LLL y", { locale: fr })}</p>
        <p className='text-xs'>Mis à jour le {service.updatedAt && format(new Date(service.updatedAt), "dd LLL y", { locale: fr })}</p>
      </div>}
    </Card>
  );
};