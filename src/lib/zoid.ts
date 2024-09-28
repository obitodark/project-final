import { object, string, z } from "zod";

export const loginSchema = object({
  email: string({
    required_error: "Email is required",
  })
    .min(1, "Email is required")
    .email("Invalid email"),

  password: string({
    required_error: "Password is required",
  })
    .min(5, "Password must be at least 5 characters")  // Cambiado a 5 ya que es el mínimo permitido
    .max(32, "Password must be less than 32 characters"),
});


// Define an enum for gender


// Define the schema for the registration form
const GenderEnum = z.enum(["Hombre", "Mujer", "Otro"]);

// Define the schema for the registration form
export const registrationSchema = z.object({
  firstName: z.string()
    .min(1, "Nombres es requerido")
    .max(100, "Nombres debe tener menos de 100 caracteres"),

  lastName: z.string()
    .min(1, "Apellidos es requerido")
    .max(100, "Apellidos debe tener menos de 100 caracteres"),

  documentType: z.string(
    { required_error: "Please select an email to display." }
  ),


  documentNumber: z.string()
    .min(8, "documento es requerido")
    .regex(/^[0-9]+$/, "documento solo puede contener números")
    .max(8, "documento debe tener maximp 8 caracteres"),

  gender: GenderEnum, // Just use GenderEnum directly

  telefono: z.string()
    .min(8, "Teléfono es requerido")
    .regex(/^[0-9]+$/, "Teléfono solo puede contener números")
    .max(9, "Teléfono debe tener menos de 10 caracteres"),

  email: z.string()
    .email("Email no válido")
    .min(1, "Email es requerido"),

  password: z.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
});
