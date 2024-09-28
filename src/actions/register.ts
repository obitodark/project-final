"use server";

import { registrationSchema } from "@/lib";
import axios from "axios";
import type { z } from "zod";

export const registerUser = async (values: z.infer<typeof registrationSchema>) => {
  // Validación con Zod
  console.log(values)
  const validatedFields = registrationSchema.safeParse(values);
  if (!validatedFields.success) {
    // Devuelve los errores de validación
    return { error: "Invalid fields" };
  }

  try {
    const response = await axios.post('http://localhost:8080/api/v1/authenticate/signin', {
      email: values.email,
      password: values.password,
    });
    console.log(response.data);
    return { success: "Login successful" };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Maneja errores específicos de Axios (como errores del servidor)
      return { error: err.response?.data?.message || "An error occurred" };
    } else {
      // Maneja otros tipos de errores
      return { error: "An unexpected error occurred" };
    }
  }
};
