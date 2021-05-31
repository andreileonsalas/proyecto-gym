import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateEnrollment = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateEnrollment),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const enrollment = await db.enrollment.update({ where: { id }, data })

    return enrollment
  }
)
