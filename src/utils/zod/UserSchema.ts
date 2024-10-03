import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string()
    .min(1, "Nombres es requerido")
    .max(100, "Nombres debe tener menos de 100 caracteres"),

  lastName: z.string()
    .min(1, "Apellidos es requerido")
    .max(100, "Apellidos debe tener menos de 100 caracteres"),


  age: z.preprocess(
    (value) => {

      if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        return Number.isInteger(parsedValue) ? parsedValue : undefined;
      }
      return Number.isInteger(value) ? value : undefined;
    },
    z.number({
      required_error: "La edad es requerida y debe ser numero entero",
    })
      .int({ message: "La edad debe ser un número entero" })
      .min(2, { message: "La edad debe ser mayor a uno" })
      .max(99, { message: "La edad debe tener un máximo de 2 dígitos" })

  ),
  typeDoc: z.string().min(1, { message: "El tipo de documento es requerido" }),

  numDoc: z.string()
    .min(8, "documento es requerido")
    .regex(/^[0-9]+$/, "documento solo puede contener números")
    .max(8, "documento debe tener maximp 8 caracteres"),


  gender: z.preprocess(
    (value) => {
      if (typeof value === "string") return value.trim(); // Asegura que el valor sea una cadena y elimina espacios.
      return String(value); // Convierte el valor a cadena si no lo es.
    },
    z.string({
      required_error: "Por favor, selecciona un género.",
      invalid_type_error: "El género debe ser una cadena.",
    }).min(1, "Por favor, selecciona un género válido")
  ),


  email: z.string()
    .email("Email no válido")
    .min(1, "Email es requerido"),


});
