import useSWR, { SWRConfiguration } from 'swr';
import { IShippingAddress } from '../interfaces';

export const useAddress = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IShippingAddress>(`/api/${url}`, config);

  return {
    adrress: data,
    isLoading: !error && !data,
    isError: error,
  };
};
