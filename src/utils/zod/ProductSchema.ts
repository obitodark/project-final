import { z } from "zod";



export const productSchema = z.object({
  name: z.string()
    .min(2, "Nombre es requerido")
    .max(500, "Nombre debe tener menos de 500 caracteres"),


  price: z.preprocess(
    (value) => {
      if (typeof value === "string") return parseFloat(value); // Convierte el string a 
      return value;
    },
    z.number({
      required_error: "el precio es requerida",
      invalid_type_error: "La precio debe ser un número",
    }).min(0.01, { message: "El precio debe ser mayor a cero" }) // Asegura que el precio sea mayor a cero
      .max(999999.99, { message: "El precio debe ser menor o igual a 999999.99" }),
  ),
  stock: z.preprocess(
    (value) => {
      if (typeof value === "string") return parseInt(value, 10); // Convierte el string a 
      return value;
    },
    z.number({
      required_error: "el stock es requerida",
      invalid_type_error: "La precio debe ser un número",
    }).min(1, { message: "El precio debe ser mayor a cero" }) // Asegura 
      .max(9999, { message: "El precio debe ser menor o igual a 999999.99" }),
  ),
  // stock: z.number()
  //   .min(1, { message: "El stock debe ser mayor a cero" })
  //   .max(999, { message: "El stock debe tener un máximo de 3 dígitos" }),


  category: z.preprocess(
    (value) => {
      if (typeof value === "string") return parseInt(value, 10); // 
      return value;
    },
    z.number({
      required_error: "La categoría es requerida",
      invalid_type_error: "La categoría debe ser un número",
    }).min(1, "La categoría es requerida")
  ),

  subcategory: z.preprocess(
    (value) => {
      if (typeof value === "string") return parseInt(value, 10); // 
      return value;
    },
    z.number({
      required_error: "La subcategoría es requerida",
      invalid_type_error: "La subcategoría debe ser un número",
    }).min(1, "La subcategoría es requerida")
  ),
  brand: z.preprocess(
    (value) => {
      if (typeof value === "string") return parseInt(value, 10); // 
      return value;
    },
    z.number({
      required_error: "La marca es requerida",
      invalid_type_error: "La marca debe ser un número",
    }).min(1, "La marca es requerida")
  ),


  description: z.string()
    .min(1, "decripcion es requerido")
    .max(1000, "description debe tener maximp 300 caracteres"),


});
