import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMontsInput
  extends Pick<Prisma.MontFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMontsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: monts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.mont.count({ where }),
      query: (paginateArgs) => db.mont.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      monts,
      nextPage,
      hasMore,
      count,
    }
  }
)
