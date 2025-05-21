export const AUTH_TOKEN_KEY = 'token';
export const AUTH_USER_KEY = 'user';
export const AUTH_USER_INFO_KEY = 'user.info'

export function getStorage(key: string, defaultValue = null) {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const value = localStorage.getItem(key);
  if (!value) {
    return defaultValue;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

export const setStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, `${value}`);
};

export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
