import type { APIResponseImage } from "@/interface"
import { postRequest } from "@/utils/http"


export const saveImages = async (images: any) => {

  const response = await postRequest<APIResponseImage>("http://localhost:8080/api/v1/images", images)
  return response.data?.result;
}
