import { resolver } from "blitz"
import db from "db"
import { CreateRoomSessionReservation } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateRoomSessionReservation),
  resolver.authorize(),
  async (input, context) => {
    const roomSessionReservation = await db.roomSessionReservation.create({
      data: {
        totalHours: 0,
        paymentType: input.paymentType,
        sessionId: input.sessionId,
        userId: context.session.userId,
      },
    })

    return roomSessionReservation
  }
)
