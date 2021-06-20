import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateRoomSession = z
  .object({
    specialities: z.string(),
    maxParticipants: z.number(),
    price: z.number(),
    roomId: z.number(),
    instructorId: z.number(),
    scheduleId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateRoomSession),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const roomSession = await db.roomSession.create({ data: input })

    return roomSession
  }
)
