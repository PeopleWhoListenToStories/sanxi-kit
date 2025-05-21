export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

export const isBrowser = typeof window !== 'undefined';