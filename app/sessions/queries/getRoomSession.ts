import db from "db"
import * as z from "zod"
import { resolver, NotFoundError } from "blitz"

const GetRoomSession = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRoomSession), resolver.authorize(), async ({ id }) => {
  const roomSession = await db.roomSession.findFirst({
    where: { id },
    select: {
      name: true,
      photo: true,
      createdAt: true,
      id: true,
      instructor: {
        select: {
          name: true,
        },
      },
      instructorId: true,
      maxParticipants: true,
      price: true,
      room: {
        select: {
          photo: true,
          maxCapacity: true,
          maxCapacityAllowed: true,
          name: true,
        },
      },
      roomId: true,
      schedule: true,
      scheduleId: true,
      specialities: true,
      updatedAt: true,
    },
  })

  if (!roomSession) throw new NotFoundError()

  return roomSession
})
