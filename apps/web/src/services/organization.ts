import { useMutation } from '@tanstack/react-query';
import { HttpClient } from '~/services/http-client';

interface Organization {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const getPersonalOrganizationListApi = async (): Promise<Organization[]> => {
  const response = await HttpClient.request<Organization[]>({
    method: 'GET',
    url: '/organization/list/personal',
  });
  return response;
};

export const getPersonalOrganizationApi = async (): Promise<Organization[]> => {
  const response = await HttpClient.request<Organization[]>({
    method: 'GET',
    url: '/organization/personal',
  });
  return response;
};

/**
 * @description 获取个人组织列表
 * @returns 
 */
export function usePersonalOrganization() {
  return useMutation({
    mutationFn: getPersonalOrganizationApi,
    onSuccess: async (data) => { },
  });
}