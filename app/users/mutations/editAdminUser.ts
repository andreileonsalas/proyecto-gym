import db from "db"
import { resolver } from "blitz"
import { UserEditAdminValidations } from "../validations"

export default resolver.pipe(
  resolver.zod(UserEditAdminValidations),
  resolver.authorize("ADMIN"),
  async (input) => {
    const user = await db.user.update({
      where: { id: input.userId },
      data: {
        name: input.name,
        photo: input.photo,
        email: input.email,
      },
    })

    return user
  }
)
