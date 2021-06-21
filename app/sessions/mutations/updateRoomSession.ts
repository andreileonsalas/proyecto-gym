import db from "db"
import { resolver } from "blitz"
import { RoomSessionEditValidations } from "../validations"

export default resolver.pipe(
  resolver.zod(RoomSessionEditValidations),
  resolver.authorize("ADMIN"),
  async (input) => {
    const roomSession = await db.roomSession.update({
      where: { id: input.sessionId },
      data: {
        name: input.name,
        maxParticipants: input.maxParticipants,
        photo: input.photo,
        price: input.price,
        specialities: input.specialities,
        schedule: {
          update: {
            closes: new Date(`1970-01-01 ${input.closesAt}:30`),
            opens: new Date(`1970-01-01 ${input.opensAt}:30`),
            weekDays: input.openDays.split(",").map((x) => x.trim()),
          },
        },
        room: {
          connect: {
            id: +input.roomId,
          },
        },
        instructor: {
          connect: {
            id: +input.instructorId,
          },
        },
      },
    })

    return roomSession
  }
)
