import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetEnrollment = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetEnrollment), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const enrollment = await db.enrollment.findFirst({ where: { id } })

  if (!enrollment) throw new NotFoundError()

  return enrollment
})
