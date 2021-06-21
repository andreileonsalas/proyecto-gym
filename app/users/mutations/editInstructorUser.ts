import db from "db"
import { resolver } from "blitz"
import { UserEditInstructorValidations } from "../validations"

export default resolver.pipe(
  resolver.zod(UserEditInstructorValidations),
  resolver.authorize("ADMIN"),
  async (input) => {
    const user = await db.user.update({
      where: { id: input.userId },
      data: {
        name: input.name,
        photo: input.photo,
        email: input.email,
        specialities: input.specialities.split(", "),
      },
    })

    return user
  }
)
