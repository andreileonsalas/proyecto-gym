import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateRoom = z
  .object({
    id: z.number(),
    name: z.string(),
    maxCapacity: z.number().int(),
    maxCapacityAllowed: z.number(),
    adminId: z.number().positive(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRoom),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const room = await db.room.update({ where: { id }, data })

    return room
  }
)
