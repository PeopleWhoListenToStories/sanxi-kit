import { useQuery, useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { getStorage, setStorage } from "~/helpers/storage";
import { usePathname, useRouter } from "~/i18n/navigation";
import { HttpClient } from "~/services/http-client";
import { ILoginUser, IUser } from "~/types";
import { useAuthStore } from "~/stores/authStore";
import { getWikiListApi } from '~/services/wiki';

/**
 * 直接去登录页
 */
export const toLogin = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const maybeRedirect = router.query?.redirect;
  const isInLogin = currentPath.startsWith('login');

  if (!isInLogin) {
    let next = maybeRedirect || currentPath || '/';

    // 确保重定向路径的安全性
    if (next.includes('login')) {
      next = '/';
    }

    // 对重定向路径进行URL编码
    const encodedNext = encodeURIComponent(next);
    router.replace(`/login?redirect=${encodedNext}`);
  }
};

/**
 * 获取验证码
 */
export const useVerifyCode = () => {
  const mutation = useMutation({
    mutationFn: (params: { email: string }) =>
      HttpClient.request({
        method: 'GET',
        url: '/verify/sendVerifyCode',
        params,
      }),
  });

  return {
    sendVerifyCode: mutation.mutate,
    loading: mutation.isPending,
  };
};

/**
 * 注册
 */
export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (data: any) =>
      HttpClient.request({
        method: 'POST',
        url: '/user/register',
        data,
      }),
  });

  return {
    register: mutation.mutate,
    loading: mutation.isPending,
  };
};

/**
 * 重置密码
 */
export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: (data: any) =>
      HttpClient.request({
        method: 'POST',
        url: '/user/resetPassword',
        data,
      }),
  });

  return {
    reset: mutation.mutate,
    loading: mutation.isPending,
  };
};

export const useUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setUserToken, updateUserToken, setWikiList, setOrganizationList, setSelectedOrganization } = useAuthStore();
  const { data, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => getStorage('user'),
  });

  /**
   * 清除用户信息后跳到登录页
   */
  const logoutMutation = useMutation({
    mutationFn: () => HttpClient.request({
      method: 'POST',
      url: '/auth/logout',
    }),
    onSuccess: () => {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      const isInShare = pathname.startsWith('/share');
      if (isInShare) {
        return;
      }
      setUser(null);
      updateUserToken('');
      setWikiList([]);
      setOrganizationList([]);
      setSelectedOrganization(null);
      toLogin();
    },
  });

  const logout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const loginMutation = useMutation({
    mutationFn: (data: any) => HttpClient.request({
      method: 'POST',
      url: '/auth/login',
      data,
    }),
    onSuccess: async (res) => {
      const user = res as unknown as ILoginUser;
      setStorage('user', JSON.stringify(user));
      setUser(user as any);
      setUserToken(user.access_token);
      user.token && setStorage('token', user.access_token);

      // 获取个人组织列表
      // const organizations = await getPersonalOrganization();
      // setOrganizationList(organizations);

      // // 获取第一个组织的 wiki 列表
      // if (organizations.length > 0) {
      //   const wikiList = await getWikiListApi(organizations[0].id);
      //   setWikiList(wikiList);
      // }

      const next = router.query?.redirect || '/work';
      router.replace(next as string);
    },
  });

  const login = useCallback(
    (data: any) => {
      loginMutation.mutate(data);
    },
    [loginMutation],
  );

  const updateUserMutation = useMutation({
    mutationFn: (patch: Pick<IUser, 'email' | 'avatar'>) => HttpClient.patch('/user/update', patch),
    onSuccess: (res) => {
      const ret = { ...data, ...res } as unknown as ILoginUser;
      setStorage('user', JSON.stringify(ret));
      refetch();
    },
  });

  const updateUser = useCallback(
    (patch: Pick<IUser, 'email' | 'avatar'>) => {
      updateUserMutation.mutate(patch);
    },
    [updateUserMutation, data],
  );

  return {
    user: data,
    loading: loginMutation.isPending || logoutMutation.isPending || updateUserMutation.isPending,
    error: data ? null : error,
    toLogin,
    login,
    logout,
    updateUser,
  };
};