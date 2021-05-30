import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetEnrollmentsInput
  extends Pick<Prisma.EnrollmentFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetEnrollmentsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: enrollments,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.enrollment.count({ where }),
      query: (paginateArgs) => db.enrollment.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      enrollments,
      nextPage,
      hasMore,
      count,
    }
  }
)
