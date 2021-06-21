import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRoomSessionReservation = z
  .object({
    sessionId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteRoomSessionReservation),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const roomSessionReservation = await db.roomSessionReservation.deleteMany({
      where: {
        sessionId: input.sessionId,
        userId: ctx.session.userId,
      },
    })

    return roomSessionReservation
  }
)
