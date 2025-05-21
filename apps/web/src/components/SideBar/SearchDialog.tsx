'use client';

import { DocumentTextIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useDebouncedCallback } from '~/hooks/useDebounce';
import { useSearchDocuments } from '~/services/document';
import { useAuthStore } from '~/stores/authStore';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { useState } from 'react';

interface SearchDialogProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export const SearchDialog = ({ title, icon, isActive }: SearchDialogProps) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { search, loading } = useSearchDocuments();
  const { organization } = useAuthStore();

  return (
    <Dialog>
      <DialogTrigger className={`flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent w-full ${isActive ? 'bg-accent' : ''}`}>
        <span>{icon}</span>
        <span>{title}</span>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <div>{title}</div>
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
  );
};