import { resolver } from "blitz"
import db from "db"
import { UserCreateValidations } from "../validations"

export default resolver.pipe(
  resolver.zod(UserCreateValidations),
  resolver.authorize("ADMIN"),
  async (input) => {
    const user = await db.user.create({
      data: {
        ...input,
      },
    })
    return user
  }
)
