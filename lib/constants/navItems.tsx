import { NavItem } from '@/lib/types';
import {
  CircleUser,
  HospitalIcon,
  LayoutDashboard,
  Users
} from 'lucide-react';
import React from 'react';

export const navItems: NavItem[] = [
  {
    title: 'Tableau de bord',
    href: '/',
    icon: <LayoutDashboard />,
  },
  {
    title: 'Cabinet',
    href: '/cabinet',
    icon: <HospitalIcon />,
  },
  {
    title: 'Utilisateurs',
    href: '/cabinet/users',
    icon: <Users />,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: <CircleUser />,
  }
];
