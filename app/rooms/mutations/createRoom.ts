import { resolver } from "blitz"
import db from "db"
import { RoomCreateValidation } from "../validations"

export default resolver.pipe(
  resolver.zod(RoomCreateValidation),
  resolver.authorize("ADMIN"),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const room = await db.room.create({
      data: {
        name: input.name,
        maxCapacity: input.maxCapacity,
        maxCapacityAllowed: input.maxCapacityAllowed,
        specialities: input.specialities.split(",").map((x) => x.trim()),
        photo: input.photoUrl,
        admin: {
          connect: {
            id: +input.adminId,
          },
        },
        schedule: {
          create: {
            closes: new Date(`1970-01-01 ${input.closesAt}:30`),
            opens: new Date(`1970-01-01 ${input.opensAt}:30`),
            weekDays: input.openDays.split(",").map((x) => x.trim()),
          },
        },
      },
    })

    return room
  }
)
