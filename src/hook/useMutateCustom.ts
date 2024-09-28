import { deleteRequest, postRequest, putRequest } from '@/utils/http';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

;

type HttpMethod = 'post' | 'put' | 'delete';

interface CustomError {
  message: string;
}

const useCustomMutation = <T, U>(
  url: string,
  queryKey: string[],
  method: HttpMethod,
  withToken: boolean = false
): UseMutationResult<T, CustomError, U> => {
  const queryClient = useQueryClient();

  return useMutation<T, CustomError, U>({
    mutationFn: async (userData: U): Promise<T> => {
      let response;

      // Llama a la función correspondiente según el método
      switch (method) {
        case 'post':
          response = await postRequest<T>(url, userData, withToken);
          break;
        case 'put':
          response = await putRequest<T>(url, userData, withToken);
          break;
        case 'delete':
          response = await deleteRequest<T>(url, withToken);
          break;
        default:
          throw new Error(`Método ${method} no soportado`);
      }

      if (response.state !== 200) {
        throw new Error('Error al realizar la solicitud');
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: CustomError) => {
      console.error('Error al realizar la mutación:', error);
    },
  });
};

export default useCustomMutation;
