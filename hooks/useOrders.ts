import useSWR, { SWRConfiguration } from 'swr';
import { IUserOrder } from '../interfaces';

export const useOrders = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IUserOrder[]>(`/api/${url}`, config);

  return {
    orders: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
