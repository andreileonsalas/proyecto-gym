import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateEnrollment = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateEnrollment),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const enrollment = await db.enrollment.create({ data: input })

    return enrollment
  }
)
