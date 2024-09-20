import { NavItem } from '@/lib/types';
import {
  HospitalIcon,
  LayoutDashboard,
} from 'lucide-react';

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
];
