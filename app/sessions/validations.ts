import * as z from "zod"

export const RoomSessionCreateValidations = z
  .object({
    name: z.string().min(3, "Ingrese mínimo 3 caracteres."),
    photo: z.string().url("Ingrese una url válida."),
    specialities: z.string(),
    maxParticipants: z.number().positive("Ingrese un positivo positivo."),
    price: z.number().positive("Ingrese un número positivo."),
    roomId: z.string(),
    instructorId: z.string(),
    opensAt: z.string().length(5, "Ingrese una hora válida"),
    closesAt: z.string().length(5, "Ingrese una hora válida"),
    openDays: z.string().min(1, "Ingrese un caracter."),
  })
  .nonstrict()

export const RoomSessionEditValidations = RoomSessionCreateValidations.extend({
  sessionId: z.number(),
})
