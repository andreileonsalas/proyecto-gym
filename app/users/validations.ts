import * as z from "zod"

export const UserEditAdminValidations = z.object({
  userId: z.number().positive(),
  email: z.string().email("Ingrese un email válida."),
  name: z.string().min(3, "Ingrese mínimo 3 caracteres.").max(31, "Ingrese máximo 31 caracteres."),
  photo: z.string().url("Ingrese una url válida."),
})
