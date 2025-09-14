import { z } from "zod";

export const emailSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  subject: z.string().min(3, "El asunto es muy corto"),
  body: z.string().min(10, "El mensaje debe tener al menos 10 caracteres")
});
