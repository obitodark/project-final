import axiosAuthInstance from '../config/axiosAuthInstance';
import axiosInstance from '../config/axiosInstance';

interface RequestResult<T> {
  data: T;
  state: number | null;
}


const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  withToken: boolean = false
): Promise<RequestResult<T>> => {
  try {
    const instance = withToken ? axiosAuthInstance : axiosInstance;
    const response = await instance[method]<T>(url, data);
    return { data: response.data, state: response.status };
  } catch (error: any) {
    const data = error.response.data || []
    const status = error.response.status || []


    return { data, state: status };
  }
};


export const getRequest = <T>(url: string, withToken: boolean = false): Promise<RequestResult<T>> => {
  return request<T>('get', url, undefined, withToken);
};

export const postRequest = <T>(url: string, data: any, withToken: boolean = false): Promise<RequestResult<T>> => {
  return request<T>('post', url, data, withToken);
};


export const putRequest = <T>(url: string, data: any, withToken: boolean = false): Promise<RequestResult<T>> => {
  return request<T>('put', url, data, withToken);
};

export const deleteRequest = <T>(url: string, withToken: boolean = false): Promise<RequestResult<T>> => {
  return request<T>('delete', url, undefined, withToken);
};
