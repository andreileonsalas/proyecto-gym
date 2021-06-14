import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

export const CreateEnrollment = z
  .object({
    id_card: z.string(),
    name: z.string(),
    phone: z.string(),
    mail: z.string(),
    defaulter: z.boolean(),
    diseases: z.string(),
    medications: z.string(),
    contacts: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateEnrollment),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const enrollment = await db.enrollment.create({ data: input })
    // return enrollment
  }
)
