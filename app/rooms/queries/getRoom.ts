import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetRoom = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRoom), resolver.authorize(), async ({ id }, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const room = await db.room.findFirst({ where: { id }, include: { schedule: true, admin: true } })

  if (!room) throw new NotFoundError()

  return room
})
