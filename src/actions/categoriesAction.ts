import type { APIResponseCategory } from "@/interface";
import { getRequest } from "@/utils/http"
import { date } from "zod";

export const getAllCategories =async () => {
  const response = await getRequest<APIResponseCategory>("/categories");
  return response.data?.result;
}
