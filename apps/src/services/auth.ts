import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '~/stores/authStore';
import { HttpClient } from '~/services/http-client';
import { usePersonalOrganization } from '~/services/organization';
import { useWikiListAll } from '~/services/wiki';

interface LoginCredentials {
  phone?: string;
  password?: string;
  email?: string;
  verifyCode?: string;
}

interface LoginResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

/**
 * 认证相关 API 服务
 */

/**
 * 用户登录接口
 * @param credentials - 登录凭证（包含用户名和密码）
 * @returns 返回包含访问令牌的登录响应
 */
export const authLoginApi = async (credentials: LoginCredentials) => {
  return await HttpClient.request<LoginResponse>({
    method: 'POST',
    url: '/auth/login',
    data: credentials,
  });
};

/**
 * 邮箱登录接口
 * @param credentials - 登录凭证（包含用户名和密码）
 * @returns 返回包含访问令牌的登录响应
 */
export const emailLoginApi = async (credentials: LoginCredentials) => {
  return await HttpClient.request<LoginResponse>({
    method: 'POST',
    url: '/auth/email-login',
    data: credentials,
  });
};

/**
 * 获取已认证用户的个人信息
 * @returns 返回用户个人资料数据
 */
export const authProfileApi = async () => {
  return await HttpClient.request({
    method: 'GET',
    url: '/auth/profile'
  });
};

/**
 * 通过邮件发送验证码
 * @returns
 */
export const sendVerifyCodeApi = async (email: string) => {
  return await HttpClient.request({
    method: 'GET',
    url: '/smtp/sendVerifyCode',
    params: {
      email
    }
  });
};

/**
 * 认证相关 React Hooks
 */

/**
 * 处理用户登录的 React Hook
 * @returns 返回处理登录操作的 useMutation 对象
 * @remarks
 * - 登录成功后设置访问令牌
 * - 登录成功后自动获取用户资料
 */
export function useLogin() {
  const { setToken } = useAuthStore();
  const profileMutation = useProfile();

  return useMutation({
    mutationFn: authLoginApi,
    onSuccess: async (data) => {
      setToken(data.access_token);
      await profileMutation.mutateAsync();
    },
  });
}

/**
 * 处理用户登录的 React Hook
 * @returns 返回处理登录操作的 useMutation 对象
 * @remarks
 * - 登录成功后设置访问令牌
 * - 登录成功后自动获取用户资料
 */
export function useEmailLogin() {
  const { setToken } = useAuthStore();
  const profileMutation = useProfile();

  return useMutation({
    mutationFn: emailLoginApi,
    onSuccess: async (data) => {
      setToken(data.access_token);
      await profileMutation.mutateAsync();
    },
  });
}


/**
 * 获取和管理用户资料的 React Hook
 * @returns 返回处理资料获取的 useMutation 对象
 * @remarks
 * - 在认证存储中设置用户数据
 * - 获取并设置个人组织数据
 * - 获取并设置该组织的 wiki 列表
 */
export function useProfile() {
  const { setUser, setOrganization, setWikiList } = useAuthStore();
  const personalOrganizationMutation = usePersonalOrganization();
  const wikiListAllMutation = useWikiListAll();

  return useMutation({
    mutationFn: authProfileApi,
    onSuccess: async (data) => {
      setUser(data);
      const resPersonalOrganization = await personalOrganizationMutation.mutateAsync();
      setOrganization(resPersonalOrganization);
      const resWiki = await wikiListAllMutation.mutateAsync(resPersonalOrganization?.id);
      setWikiList(resWiki.data || []);
    },
  });
}

/**
 * 发送验证码的 React Hook
 */
export function useVerifyCode() {
  return useMutation({
    mutationFn: sendVerifyCodeApi
  });
}