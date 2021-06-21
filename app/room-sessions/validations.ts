import * as z from "zod"

export const RoomSessionCreateValidations = z
  .object({
    name: z.string(),
    photo: z.string(),
    specialities: z.string(),
    maxParticipants: z.number(),
    price: z.number(),
    roomId: z.string(),
    instructorId: z.string(),
    opensAt: z.string(),
    closesAt: z.string(),
    openDays: z.string(),
  })
  .nonstrict()
