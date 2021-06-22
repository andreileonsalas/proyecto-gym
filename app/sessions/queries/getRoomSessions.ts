import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRoomSessionsInput
  extends Pick<Prisma.RoomSessionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetRoomSessionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: roomSessions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.roomSession.count({ where }),
      query: (paginateArgs) =>
        db.roomSession.findMany({
          ...paginateArgs,
          where,
          orderBy,
          select: {
            name: true,
            photo: true,
            createdAt: true,
            id: true,
            instructor: {
              select: {
                name: true,
              },
            },
            instructorId: true,
            maxParticipants: true,
            price: true,
            room: {
              select: {
                photo: true,
                maxCapacity: true,
                maxCapacityAllowed: true,
                name: true,
              },
            },
            roomId: true,
            schedule: true,
            scheduleId: true,
            specialities: true,
            updatedAt: true,
          },
        }),
    })

    return {
      roomSessions,
      nextPage,
      hasMore,
      count,
    }
  }
)
