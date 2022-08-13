import useSWR, { SWRConfiguration } from 'swr';

export const useRole = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR(`/api/${url}`);
  return {
    role: data || 'client',
    isLoading: !error && !data,
    isError: error,
  };
};
