import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRoomSessionReservationsInput
  extends Pick<Prisma.RoomSessionReservationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRoomSessionReservationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: roomSessionReservations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.roomSessionReservation.count({ where }),
      query: (paginateArgs) =>
        db.roomSessionReservation.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      roomSessionReservations,
      nextPage,
      hasMore,
      count,
    }
  }
)
