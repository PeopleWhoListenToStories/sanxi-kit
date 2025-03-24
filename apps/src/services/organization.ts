import { HttpClient } from '~/services/http-client';

interface Organization {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const getPersonalOrganizationList = async (): Promise<Organization[]> => {
  const response = await HttpClient.request<Organization[]>({
    method: 'GET',
    url: '/organization/list/personal',
  });
  return response;
};

export const getPersonalOrganization = async (): Promise<Organization[]> => {
  const response = await HttpClient.request<Organization[]>({
    method: 'GET',
    url: '/organization/personal',
  });
  return response;
};