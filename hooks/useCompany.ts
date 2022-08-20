import useSWR, { SWRConfiguration } from 'swr';
import { ICompany } from '../interfaces';

export const useCompany = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ICompany>(`/api/${url}`, config);

  return {
    company: data,
    isLoading: !error && !data,
    isError: error,
  };
};
