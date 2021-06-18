import { useQuery } from "@blitzjs/core"
import { Flex } from "@chakra-ui/react"
import { Form, FormProps } from "app/core/components/Form"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import getUsers from "app/users/queries/getUsers"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export default function RoomForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [users] = useQuery(getUsers, {
    where: {
      role: "ADMIN",
    },
  })

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="San Jose Sur" />
      <LabeledTextField
        name="photoUrl"
        label="Foto"
        placeholder="https://via.placeholder.com/150"
      />

      <Flex css={{ gap: "1rem" }}>
        <LabeledTextField name="maxCapacity" label="Capacidad" placeholder="100" type="number" />
        <LabeledTextField
          name="maxCapacityAllowed"
          label="Capacidad permitada"
          placeholder="70"
          type="number"
        />
      </Flex>
      <LabeledTextField name="specialities" label="Especialidades" placeholder="Yoga, Gimnasia" />
      <LabeledSelectField
        name="adminId"
        label="Administrador"
        placeholder="Seleccione un administrador..."
        options={users.users.map(({ id, name, email }) => ({ value: +id, label: name || email }))}
      />
      <Flex css={{ gap: "1rem" }}>
        <LabeledTextField name="opensAt" label="Hora de apertura" placeholder="9:30" />
        <LabeledTextField name="closesAt" label="Hora de cierre" placeholder="21:30" />
      </Flex>
      <LabeledTextField name="openDays" label="Días abierto" placeholder="L, X, M, J, V, S, D" />
    </Form>
  )
}
