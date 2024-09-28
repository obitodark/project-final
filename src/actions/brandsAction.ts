import type { APIResponseBrand } from "@/interface/brand.interface"
import { getRequest } from "@/utils/http"

export const getAllBrand = async () => {
  const response = await getRequest<APIResponseBrand>("/brands")
  return response.data?.result;
}
