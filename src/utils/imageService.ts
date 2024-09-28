
import type { APIResponseImage } from "@/interface";
import axios from "axios";
import { postRequest } from "./http";

export const uploadImages = async (files: File[]): Promise<number[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    if (file !== undefined) {
      formData.append('images', file);
    }
  });

  try {
    const response = await postRequest<APIResponseImage>('/images', formData, true);

    const images = response.data?.result.map((image) => image.id) ?? [];

    return images;

  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};
