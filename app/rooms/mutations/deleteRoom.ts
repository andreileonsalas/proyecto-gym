import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRoom = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteRoom), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const room = await db.room.deleteMany({ where: { id } })

  return room
})
