import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

export const UpdateRoomSession = z
  .object({
    id: z.number(),
    name: z.string(),
    photo: z.string(),
    specialities: z.string(),
    maxParticipants: z.number(),
    price: z.number(),
    roomId: z.number(),
    instructorId: z.number(),
    scheduleId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRoomSession),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const roomSession = await db.roomSession.update({ where: { id }, data })

    return roomSession
  }
)
