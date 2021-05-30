import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteEnrollment = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteEnrollment),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const enrollment = await db.enrollment.deleteMany({ where: { id } })

    return enrollment
  }
)
