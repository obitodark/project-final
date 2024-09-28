import { object, string, z } from "zod";


export const SignInShema = z.object({
  email: string({
    required_error: "Email es requerido",
  })
    .min(1, "Email es requerido")
    .email("Email es invalido"),

  password: string({
    required_error: "Password es requerido",
  })
    .min(5, "Password almenos de tener 5 caracteres")
    .max(32, "Password debe ser menor 32 caracteres"),
});


