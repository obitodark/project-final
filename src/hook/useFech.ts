import { getRequest } from '@/utils/http';
import useSWR from 'swr';

export const useFetch = <T>(url: string, withToken: boolean = false) => {
  // El fetcher debe devolver datos del tipo correcto o lanzar un error
  const fetcher = async (url: string) => {
    const result = await getRequest<T>(url, withToken);
    if (result.state) {
      throw result.state; // Lanzar el error para que SWR lo maneje
    }
    return result.data as T; // Asegúrate de que solo se devuelvan datos del tipo T
  };

  // Usar useSWR con el fetcher
  const { data, error, mutate, isValidating } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
  });

  // Ajustar la lógica de carga
  const isLoading = !data && !error;

  return { data, error, mutate, isValidating, isLoading };
};
