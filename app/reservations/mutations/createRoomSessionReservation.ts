import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateRoomSessionReservation = z
  .object({
    sessionId: z.number(),
    paymentType: z.enum(["BEFORE_HAND", "IN_TIME"]),
    totalHours: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateRoomSessionReservation),
  resolver.authorize(),
  async (input, context) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = context.session.userId
    const roomSessionReservation = await db.roomSessionReservation.create({
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
