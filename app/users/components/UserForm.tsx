import { Form, FormProps } from "app/core/components/Form"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function UserForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="Nombre" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledSelectField
        name="role"
        label="Posición"
        placeholder="Seleccione un role..."
        options={[
          { value: "ADMIN", label: "Administrador" },
          { value: "INSTRUCTOR", label: "Instructor" },
          { value: "CLIENT", label: "Cliente" },
        ]}
      />
    </Form>
  )
}
