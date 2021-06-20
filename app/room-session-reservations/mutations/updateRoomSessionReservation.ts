import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateRoomSessionReservation = z
  .object({
    sessionId: z.number(),
    paymentType: z.enum(["BEFORE_HAND", "IN_TIME"]),
    totalHours: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRoomSessionReservation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const roomSessionReservation = await db.roomSessionReservation.update({
      where: { id },
      data: {
        paymentType: input.paymentType,
        totalHours: input.totalHours,
        sessionId: input.sessionId,
        userId: userId,
      },
    })

    return roomSessionReservation
  }
)
