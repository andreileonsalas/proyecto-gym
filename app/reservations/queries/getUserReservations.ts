import db from "db"
import { resolver } from "blitz"

export default resolver.pipe(async (_, ctx) => {
  if (!ctx.session.$isAuthorized) return []

  const reservations = await db.roomSessionReservation.findMany({
    where: {
      userId: ctx.session.userId || 1,
    },
    include: {
      session: true,
    },
  })

  return reservations
})
