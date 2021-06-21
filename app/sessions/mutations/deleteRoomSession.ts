import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRoomSession = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteRoomSession),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const roomSession = await db.roomSession.deleteMany({ where: { id } })

    return roomSession
  }
)
