'use client';

import {ReactNode} from 'react';
import { LocaleSwitcher } from '~/components/LocaleSwitcher';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

type Props = {
  children?: ReactNode;
  title?: string;
};

export const DefaultPageLayout = ({children, title}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-[100vw] h-[100vh] relative bg-background dark:bg-background">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        { title && <h1>{title}</h1> }
        {children}
      </div>
    </QueryClientProvider>
  );
}