import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateMont = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateMont), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const mont = await db.mont.create({ data: input })

  return mont
})
