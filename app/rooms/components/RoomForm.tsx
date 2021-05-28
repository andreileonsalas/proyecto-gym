import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function RoomForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
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
      <LabeledTextField name="adminId" label="Admin" placeholder="Admin" type="number" />
    </Form>
  )
}
