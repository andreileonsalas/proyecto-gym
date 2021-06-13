import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateMont = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateMont),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mont = await db.mont.update({ where: { id }, data })

    return mont
  }
)
