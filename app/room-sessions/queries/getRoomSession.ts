import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetRoomSession = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRoomSession), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const roomSession = await db.roomSession.findFirst({ where: { id } })

  if (!roomSession) throw new NotFoundError()

  return roomSession
})
