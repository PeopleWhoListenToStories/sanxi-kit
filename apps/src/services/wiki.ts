import { HttpClient } from '~/services/http-client';
import type { IWiki } from '~/types/wiki';

/**
 * 获取组织下的所有 wiki 列表
 */
export const getWikiListApi = async (organizationId: string): Promise<IWiki[]> => {
  const response = await HttpClient.request<IWiki[]>({
    method: 'GET',
    url: `/wiki/list/all/${organizationId}`,
  });
  return response;
};