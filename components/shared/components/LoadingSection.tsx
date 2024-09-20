'use client';

import React, { FC, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useCurrentUserContext } from '@/contextes/user/CurrentUserContext';
import { Skeleton } from '@/components/ui/skeleton';

type LoadingCardProps = {
  children: React.ReactNode;
  loading: boolean;
  className?: string;
  loadingClassName?: string;
  withCard?: boolean;
};

export const LoadingSection: FC<LoadingCardProps> = ({
  children,
  className,
  loadingClassName,
  loading,
  withCard = false,
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

  return <>{children}</>;
};
