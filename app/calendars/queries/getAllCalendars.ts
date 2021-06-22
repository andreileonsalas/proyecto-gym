import db from "db"
import { resolver } from "blitz"

export default resolver.pipe(async () => {
  const sessions = await db.roomSession.findMany({
    select: {
      name: true,
      instructor: {
        select: {
          name: true,
        },
      },
      schedule: {
        select: {
          closes: true,
          opens: true,
          weekDays: true,
        },
      },
    },
  })

  const rooms = await db.room.findMany({
    select: {
      name: true,
      schedule: {
        select: {
          closes: true,
          opens: true,
          weekDays: true,
        },
      },
    },
  })

  return { sessions, rooms }
})
