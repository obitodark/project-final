import { z } from "zod";


export const subcategoriesSchema = z.object({
  name: z.string()
    .min(2, "Nombre es requerido")
    .max(300, "Nombre debe tener menos de 300 caracteres"),

  category: z.preprocess(
    (value) => {
      if (typeof value === "string") return parseInt(value, 10); // Convierte el string a 
      return value;
    },
    z.number({
      required_error: "La categoría es requerida",
      invalid_type_error: "La categoría debe ser un número",
    }).min(1, "La categoría es requerida")
  ),


});
