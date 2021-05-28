import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateRoom = z
  .object({
    name: z.string(),
    maxCapacity: z.number().int(),
    maxCapacityAllowed: z.number(),
    adminId: z.number().positive(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateRoom), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const room = await db.room.create({ data: input })

  return room
})
