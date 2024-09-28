import type { APIResponseProducts, ProductDTO } from "@/interface"
import { getRequest, postRequest } from "@/utils/http"

export const getAllProducts = async () => {

  const response = await getRequest("/product")
  return response
}

export const saveProduct = async (data: ProductDTO) => {
  const response = await postRequest<APIResponseProducts>("/product", data)
  return response.state
}
