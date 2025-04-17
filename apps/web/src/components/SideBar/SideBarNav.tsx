'use client';

import { HomeIcon, MagnifyingGlassIcon, ShareIcon, StarIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation';
import { NavItem } from './NavItem';

export const SideBarNav = () => {
  const pathname = usePathname();

  const list = [
    {
      key: 'home',
      label: '我的首页',
      icon: <HomeIcon className='w-[20px] h-[20px]' />,
      href: '/work',
    },
    {
      key: 'search',
      label: '搜索',
      icon: <MagnifyingGlassIcon className='w-[20px] h-[20px]' />,
      href: '#',
    },
    {
      key: 'star',
      label: '收藏',
      icon: <StarIcon className='w-[20px] h-[20px]' />,
      href: '/work/star',
    },
    {
      key: 'share',
      label: '我的分享',
      icon: <ShareIcon className='w-[20px] h-[20px]' />,
      href: '/work/share',
    }
  ]

  return (
    <div className="flex flex-col items-start gap-2 px-2 py-1.5 rounded-lg">
      {list.map(item => {
        const isActive = pathname.startsWith(item.href);
        return <NavItem key={item.key} item={item} isActive={isActive} />;
      })}
    </div>
  )
};