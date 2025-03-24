import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '~/stores/authStore';
import { HttpClient } from '~/services/http-client';
import { getPersonalOrganization } from '~/services/organization';
import { getWikiListApi } from '~/services/wiki';

interface LoginCredentials {
  name: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authLoginApi = async (credentials: LoginCredentials) => {
  const response = await HttpClient.request<LoginResponse>({
    method: 'POST',
    url: '/auth/login',
    data: credentials,
  });
  return response
};

export async function loginApi(credentials: LoginCredentials): Promise<LoginResponse> {
  return authLoginApi(credentials)
}

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      login(data.token, {
        id: data.id,
        email: data.email,
        name: data.name,
        nickname: data.nickname,
        avatar: data.avatar
      });
      const { setOrganization, setWikiList } = useAuthStore.getState();
      const organization = await getPersonalOrganization();
      setOrganization(organization);
      const { data: wikiListData } = await getWikiListApi(organization.id)
      setWikiList(wikiListData || []);
    },
  });
}

export async function getToken() {
  return Promise.resolve({
    token: useAuthStore().token
  })
}