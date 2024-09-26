'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/lib/types';
import useUserStore from '@/stores/user';

export const NavItemLink: FC<{ item: NavItem; type: 'full' | 'icon' }> = ({
  item,
  type,
}) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const pathname = usePathname();
  const { href, icon, title, isOwnerItem } = item;
  const css_class = cn(
    'flex gap-x-2 w-full text-accent items-center text-[18px] font-medium p-2 hover:bg-background hover:text-primary rounded-sm mb-1',
    {
      'hidden': isOwnerItem && !currentUser.isOwner,
      'justify-center': type === 'icon',
      'bg-background text-primary':
        pathname === href || (href !== '/' && pathname.endsWith(href)),
    },
  );

  // @ts-ignore
  return (
    <Link key={href} href={href} className={css_class}>
      {icon}
      {type === 'full' && title}
    </Link>
  );
};
