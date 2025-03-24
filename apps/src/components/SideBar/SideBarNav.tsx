'use client';

import { HomeIcon, MagnifyingGlassIcon, ShareIcon, StarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { useState } from 'react';
import { useSearchDocuments } from '~/services/document';
import { useAuthStore } from '~/stores/authStore';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
  import { useDebouncedCallback } from '~/hooks/useDebounce';

export const SideBarNav = () => {
  const pathname = usePathname();
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { search, loading } = useSearchDocuments();
  const { organization } = useAuthStore();

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
      {
        list.map(item => {
          const isActive = pathname.startsWith(item.href);
          return (
            item.key === 'search' ? (
              <Dialog key={item.key}>
                <DialogTrigger className={`flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent w-full ${isActive ? 'bg-accent' : ''}`}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex flex-col gap-4">
                    <div>搜索</div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="请输入搜索关键词"
                        value={keyword}
                        onChange={useDebouncedCallback((e) => {
                          setKeyword(e.target.value);
                          search({ keyword: e.target.value, organizationId: organization.id })
                            .then(setSearchResults)
                            .catch(console.error);
                        }, 300)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {loading && <div className="text-center">搜索中...</div>}
                      {!loading && searchResults.length === 0 && <div className="text-center">暂无搜索结果</div>}
                      {!loading && searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/work/${result.id}`}
                          className="p-2 hover:bg-accent rounded-lg flex items-center gap-2"
                        >
                          <DocumentTextIcon className="w-[20px] h-[20px] mr-1" /> {result.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent w-full ${isActive ? 'bg-accent' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          )
        })
      }
    </div>
  )
};