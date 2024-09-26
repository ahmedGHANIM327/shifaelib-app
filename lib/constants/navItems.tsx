import { NavItem } from '@/lib/types';
import {
  Activity,
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
    icon: <LayoutDashboard size={20}/>,
  },
  {
    title: 'Cabinet',
    href: '/cabinet',
    icon: <HospitalIcon size={20}/>,
  },
  {
    title: 'Utilisateurs',
    href: '/cabinet/users',
    icon: <Users size={20}/>,
  },
  {
    title: 'Services',
    href: '/cabinet/services',
    icon: <Activity size={20}/>,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: <CircleUser size={20}/>,
  }
];
