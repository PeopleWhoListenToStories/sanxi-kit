import { useMutation } from '@tanstack/react-query';
import { HttpClient } from '~/services/http-client';
import type { IWiki } from '~/types/wiki';

/**
 * 获取组织下的所有 wiki 列表
 */
export const getWikiListAllApi = async (organizationId: string): Promise<IWiki[]> => {
  const response = await HttpClient.request<IWiki[]>({
    method: 'GET',
    url: `/wiki/list/all/${organizationId}`,
  });
  return response;
};

/**
 * 获取指定组织下的所有 Wiki 列表
 * @function useWikiListAll
 * @returns {UseMutationResult} 用于获取 Wiki 列表的 Mutation
 * @example
 * const mutation = useWikiListAll();
 * mutation.mutate();
 * @remarks
 * 该 Hook 使用 `useMutation` 调用 `getWikiListAllApi`，并在成功时打印返回的数据。
 * @see getWikiListAllApi
 */
export function useWikiListAll() {
  return useMutation({
    mutationFn: getWikiListAllApi,
    onSuccess: async () => { },
  });
}