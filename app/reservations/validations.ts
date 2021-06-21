import * as z from "zod"

export const CreateRoomSessionReservation = z
  .object({
    sessionId: z.number(),
    paymentType: z.enum(["BEFORE_HAND", "IN_TIME"]),
  })
  .nonstrict()
