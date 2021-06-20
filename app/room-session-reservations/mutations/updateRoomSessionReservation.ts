import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateRoomSessionReservation = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRoomSessionReservation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const roomSessionReservation = await db.roomSessionReservation.update({ where: { id }, data })

    return roomSessionReservation
  }
)
