import { z } from "zod";


export const brandSchema = z.object({
  name: z.string()
    .min(2, "Nombre es requerido")
    .max(300, "Nombre debe tener menos de 300 caracteres"),




});
