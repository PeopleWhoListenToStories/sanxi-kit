import type { Axios, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { toast } from '~/components/ui/use-toast';
// import { toLogin } from '~/services/user';
import { useAuthStore } from '~/stores/authStore';
import { isBrowser } from '~/helpers/utils/isEnv';
import { removeStorage } from '~/helpers/storage';

type WithCookieAxiosRequestConfig = AxiosRequestConfig & { cookie?: string };

type AxiosInstance = {
  request: <T>(config: WithCookieAxiosRequestConfig) => Promise<T>;
} & Axios;

export const HttpClient = axios.create({
  baseURL: `${process.env.SERVER_API_URL}`,
  timeout: process.env.NODE_ENV === 'production' ? 10 * 60 * 1000 : 60 * 1000,
  withCredentials: false,
}) as AxiosInstance;

HttpClient.interceptors.request.use((config: WithCookieAxiosRequestConfig) => {

    const cookie = config.cookie;
    if (cookie) {
      if (typeof window === 'undefined' && config.headers && !config.headers.cookie) {
        config.headers.cookie = cookie;
      }
      delete config.cookie;
    }
    if (config.headers) {
      config.headers.Authorization = `Bearer ${useAuthStore.getState().token}`;
    } else {
      config.headers = { Authorization: `Bearer ${useAuthStore.getState().token}` };
    }
    return config;
  },
  () => {
    throw new Error('Request initialization error');
  },
);

HttpClient.interceptors.response.use(
  (data) => {
    if (data.status && +data.status === 200 && data.data.status === 'error') {
       
      isBrowser && toast({ title: data.data.message });
      return null;
    }

    const res = data.data;

    if (!res.success) {
      toast({ title: res.msg });
      return null;
    }
    return res.data;
  },
  (err) => {
    if (err && err.response && err.response.status) {
      const status = err.response.status;

      switch (status) {
        case 504:
        case 404:
           
          // isBrowser && toast({ title: (err.response && err.response.data && err.response.data.message) || t('error.request.serverError') });
          break;
        case 401:
          if (isBrowser) {
            removeStorage('user-store');
            toast({ title: err.response.data.message });
            // toLogin();
          }
          break;
        case 429:
           
          isBrowser && toast({ title: t('error.request.tooManyRequests') });
          break;
        default:
           
          isBrowser && toast({ title: (err.response && err.response.data && err.response.data.message) || t('error.request.unknownError') });
      }
      return Promise.reject({ statusCode: err.response.status, message: err.response.data.message });
    }

    return Promise.reject(err);
  },
);
