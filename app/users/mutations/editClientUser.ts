import db from "db"
import { resolver } from "blitz"
import { UserEditClientValidations } from "../validations"

export default resolver.pipe(
  resolver.zod(UserEditClientValidations),
  resolver.authorize("ADMIN"),
  async (input) => {
    const user = await db.user.update({
      where: { id: input.userId },
      data: {
        name: input.name,
        photo: input.photo,
        email: input.email,
        emergencyContacts: input.emergencyContacts.split(", "),
        diseases: input.diseases.split(", "),
        medicines: input.medicines.split(", "),
      },
    })

    return user
  }
)
