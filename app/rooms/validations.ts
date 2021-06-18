import * as z from "zod"

export const RoomCreateValidation = z.object({
  name: z.string().min(2, "Ingrese 2 caracteres."),
  photoUrl: z.string(),
  maxCapacity: z.number().int(),
  maxCapacityAllowed: z.number(),
  adminId: z.string(),
  opensAt: z.string(),
  closesAt: z.string(),
  openDays: z.string(),
  specialities: z.string(),
})
