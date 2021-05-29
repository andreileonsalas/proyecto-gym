import { useQuery } from "@blitzjs/core"
import { Form, FormProps } from "app/core/components/Form"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import getUsers from "app/users/queries/getUsers"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function RoomForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [users] = useQuery(getUsers, {
    where: {
      role: "ADMIN",
    },
  })

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="Nombre" />
      <LabeledTextField
        name="maxCapacity"
        label="Capacidad"
        placeholder="Capacidad"
        type="number"
      />
      <LabeledTextField
        name="maxCapacityAllowed"
        label="Capacidad permitada"
        placeholder="Name"
        type="number"
      />
      <LabeledSelectField
        name="adminId"
        label="Administrador"
        placeholder="Seleccione un administrador..."
        options={users.users.map(({ id, name, email }) => ({ value: +id, label: name || email }))}
      />
    </Form>
  )
}
