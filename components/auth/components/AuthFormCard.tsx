import React, { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type AuthFormCardProps = {
  title?: string;
  description?: string;
  containerClass?: string;
  children: React.ReactNode;
};

const AuthFormCard: FC<AuthFormCardProps> = (props) => {
  const { containerClass, children, title, description } = props;

  return (
    <Card
      className={cn(
        'md:max-w-[600px] w-[90%] pt-12 pb-10 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]',
        containerClass,
      )}
    >
      <CardHeader className="p-0 md:mb-8 mb-4 flex items-center font-space_grotesk">
        <Link href={'/'}>
          <Image
            src="https://centrehassy.com/wp-content/uploads/2024/08/shifae-lib-only-icone-tr.png"
            alt={'alt'}
            width={70}
            height={70}
            className="mb-2"
          />
        </Link>
        <h2
          className={'text-xl font-semibold text-primary text-center mb-2 mt-2'}
        >
          {title}
        </h2>
        <p className="text-center text-sm">{description}</p>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
};

export default AuthFormCard;
