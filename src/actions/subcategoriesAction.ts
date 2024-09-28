
import type { APIResponseSubcategories } from "@/interface"
import { getRequest } from "@/utils/http"

export const getAllSubcategories = async () => {
  const response = await getRequest<APIResponseSubcategories>("/subcategories")
  return response.data?.result
}
