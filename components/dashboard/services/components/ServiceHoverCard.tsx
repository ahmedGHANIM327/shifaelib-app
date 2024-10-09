import React, { FC } from 'react';
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn, convertDurationToLabel, getFullName } from '@/lib/utils';
import Link from 'next/link';
import { AdditionalQuestionType, Service } from '@/lib/types/services';
import { COLORS } from '@/lib/constants';
import {
  AdditionalQuestionsFicheModal
} from '@/components/dashboard/services/components/AdditionalQuestionsFicheModal';

export const ServiceHoverCard:FC<{ service: Service|null; triggerClassName?: string }> = ({ service, triggerClassName }) => {

  if(!service) {
    return '-';
  }

  const color = service.color;
  const bgColor = COLORS.find(c => c.color === color)?.bgColor!;
  const textColor = COLORS.find(c => c.color === color)?.textColor!;
  const textLightColor = COLORS.find(c => c.color === color)?.textLightColor!;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className={cn(`px-0 w-fit underline ${textColor}`, triggerClassName)}>{service.name}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 pb-2">
        <div className={`text-center py-2 rounded-t-md relative ${bgColor} ${textLightColor}`}>
          {service.name}
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
            {(service.config as AdditionalQuestionType[]).length > 0 ?
              <AdditionalQuestionsFicheModal service={service} /> : '-'}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};