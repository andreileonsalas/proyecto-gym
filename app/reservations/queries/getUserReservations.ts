import db from "db"
import { resolver } from "blitz"

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const reservations = await db.roomSessionReservation.findMany({
    where: {
      userId: ctx.session.userId,
    },
    include: {
      session: true,
    },
  })

  return reservations
})
