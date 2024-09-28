import { z } from "zod";


export const addressSchema = z.object({
  department: z.string()
    .min(2, "Departamento es requerido")
    .max(100, "Departamento debe tener menos de 100 caracteres"),

  province: z.string()
    .min(2, "Provincia es requerido")
    .max(100, "Provincia debe tener menos de 100 caracteres"),


  district: z.string()
    .min(2, "Distrito es requerido")
    .max(100, "Distrito debe tener menos de 100 caracteres"),


  address: z.string()
    .min(5, "Dirección es requerido")
    .max(300, "Dirección debe tener menos de 300 caracteres"),
});
