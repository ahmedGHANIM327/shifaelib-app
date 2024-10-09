'use client';

import React, { FC } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type LoadingCardProps = {
  children: React.ReactNode;
  loading: boolean;
  className?: string;
  loadingClassName?: string;
  withCard?: boolean;
  childrenClassName?: string;
};

export const LoadingSection: FC<LoadingCardProps> = ({
  children,
  className,
  loadingClassName,
  loading,
  withCard = false,
                                                       childrenClassName
}) => {
  if (loading) {
    if (withCard) {
      return (
        <Card className={`md:p-4 p-2 ${className}`}>
          <Skeleton className={loadingClassName} />
        </Card>
      );
    }
    return <Skeleton className={loadingClassName} />;
  }

  return <div className={childrenClassName}>{children}</div>;
};
