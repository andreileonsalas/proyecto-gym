import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetRoomSessionReservation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetRoomSessionReservation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const roomSessionReservation = await db.roomSessionReservation.findFirst({ where: { id } })

    if (!roomSessionReservation) throw new NotFoundError()

    return roomSessionReservation
  }
)
