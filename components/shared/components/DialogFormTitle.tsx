import React, { FC } from 'react';
import { cn } from '@/lib/utils';

type DialogFormTitleProps = {
  title: string;
  className?: string;
  titleClassName?: string;
};
export const DialogFormTitle: FC<DialogFormTitleProps> = ({
  title,
  className,
  titleClassName,
}) => {
  return (
    <div className={cn(
        'border-b-2 w-full',
        className,
    )}>
      <p
        className={cn(
          'text-xl font-semibold text-primary text-center my-4',
          titleClassName,
        )}
      >
        {title}
      </p>
    </div>
  );
};
