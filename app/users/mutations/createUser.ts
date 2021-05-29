import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateUser = z
  .object({
    name: z.string().min(2, "Ingrese mínimo 2 caracteres."),
    email: z.string().min(2, "Ingrese mínimo 2 caracteres."),
    role: z.enum(["ADMIN", "CLIENT", "INSTRUCTOR"]),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateUser), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.create({ data: input })

  return user
})
