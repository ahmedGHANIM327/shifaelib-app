import React, { FC } from 'react';
import { cn } from '@/lib/utils';

type DialogFormContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export const DialogFormContainer: FC<DialogFormContainerProps> = ({
  className,
  children,
}) => {
  return <div className={cn('p-4 h-fit max-h-[60vh] overflow-y-scroll', className)}>{children}</div>;
};
