'use client';

import Link from 'next/link';
import { SearchDialog } from './SearchDialog';

interface NavItemProps {
  item: {
    key: string;
    label: string;
    icon: React.ReactNode;
    href: string;
  };
  isActive: boolean;
}

export const NavItem = ({ item, isActive }: NavItemProps) => {
  if (['search', 'share', 'star'].includes(item.key)) {
    return <SearchDialog title={item.label} icon={item.icon} isActive={isActive} />;
  }

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent w-full ${isActive ? 'bg-accent' : ''}`}
    >
      <span>{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );
};