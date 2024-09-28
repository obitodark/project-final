import type { Products, ProductsParams, APIResponseSearchProducts } from '@/interface';
import axios from 'axios';



// Define los parámetros de la función


// Función para obtener productos
export const getProducts = async (params: ProductsParams | string) => {
  try {
    // Construye la URL manualmente
    const baseURL = 'http://localhost:8080/api/v1/product/search';
    const queryString = new URLSearchParams(params as any).toString();
    const fullURL = `${baseURL}?${queryString}`;

    console.log("URL completa:", fullURL);

    const response = await axios.get<APIResponseSearchProducts>(fullURL);
    return { data: response.data.result.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const getFilterProducts = async (params: ProductsParams | string) => {
  try {
    // Construye la URL manualmente
    const baseURL = 'http://localhost:8080/api/v1/product/search';
    const queryString = new URLSearchParams(params as any).toString();
    const fullURL = `${baseURL}?${queryString}`;

    console.log("URL completa:", fullURL);

    const response = await axios.get<APIResponseSearchProducts>(fullURL);
    return { data: response.data.result.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
