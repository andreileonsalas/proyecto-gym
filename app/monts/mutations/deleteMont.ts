import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteMont = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteMont), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const mont = await db.mont.deleteMany({ where: { id } })

  return mont
})
