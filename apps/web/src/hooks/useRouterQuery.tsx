import type { Router } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function useRouterQuery<T extends Router['query']>() {
  const router = useRouter();
  console.log(`%c 🎮 🚀 : router `, `font-size:14px;background-color:#2f6a9b;color:white;`, router);

  return router.query as T;
}
