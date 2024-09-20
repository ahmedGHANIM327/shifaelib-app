import React, { FC } from 'react';
import { cn } from '@/lib/utils';

type DialogFormActionsProps = {
  className?: string;
  children: React.ReactNode;
};

export const DialogFormActions: FC<DialogFormActionsProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'border-t-2 py-2 mt-2 flex justify-end flex-wrap gap-2 px-2',
        className,
      )}
    >
      {children}
    </div>
  );
};
