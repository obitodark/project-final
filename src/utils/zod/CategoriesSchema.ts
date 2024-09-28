import { z } from "zod";


export const categoriesSchema = z.object({
  name: z.string()
    .min(2, "Nombre es requerido")
    .max(300, "Nombre debe tener menos de 300 caracteres"),


  description: z.string()
    .min(1, "decripcion es requerido")
    .max(500, "description debe tener maximp 500 caracteres"),


});
