import { Flex } from "@chakra-ui/react"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import getUsers from "app/users/queries/getUsers"
import { useQuery } from "blitz"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function RoomSessionForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [instructors] = useQuery(getUsers, {
    where: {
      role: "INSTRUCTOR",
    },
  })

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="Sesiones de Yoga Astral" />
      <LabeledTextField name="photo" label="Foto" placeholder="https://via.placeholder.com/150" />
      <LabeledTextField
        name="specialities"
        label="Especialidades (Separados por ,)"
        placeholder="Yoga"
      />
      <LabeledTextField
        name="maxParticipants"
        label="Capacidad de participantes"
        placeholder="100"
        type="number"
      />
      <LabeledTextField name="price" label="Precio total" placeholder="10000" type="number" />
      <LabeledSelectField
        name="instructorId"
        label="Instructor"
        placeholder="Seleccione un instructor..."
        options={instructors.users.map(({ id, name, email }) => ({
          value: +id,
          label: name || email,
        }))}
      />
      <Flex css={{ gap: "1rem" }}>
        <LabeledTextField name="opensAt" label="Hora de apertura" placeholder="9:30" />
        <LabeledTextField name="closesAt" label="Hora de cierre" placeholder="21:30" />
      </Flex>
      <LabeledTextField name="openDays" label="Días abierto" placeholder="L, X, M, J, V, S, D" />
    </Form>
  )
}
