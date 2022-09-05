import useSWR, { SWRConfiguration } from 'swr';
import { ICartProduct } from '../interfaces';

export const useCartCache = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ICartProduct[]>(`/api/${url}`, config);

  return {
    cartCache: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
