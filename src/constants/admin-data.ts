import { NavItem } from '@/types/admin';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    title: 'Country',
    href: '/country',
    icon: 'country',
    label: 'country',
  },
  {
    title: 'Vacancy',
    href: '/vacancy',
    icon: 'vacancy',
    label: 'Vacancy',
  },
  {
    title: 'Posts',
    href: '/posts',
    icon: 'blogs',
    label: 'blogs',
  },
  {
    title: 'Social Media',
    href: '/settings/social-media',
    icon: 'settings',
    label: 'Social Media Settings',
  },
  {
    title: 'Admin Management',
    href: '/admins',
    icon: 'user',
    label: 'Admin Management',
  },
];
