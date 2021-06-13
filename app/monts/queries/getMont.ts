import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetMont = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetMont), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const mont = await db.mont.findFirst({ where: { id } })

  if (!mont) throw new NotFoundError()

  return mont
})
