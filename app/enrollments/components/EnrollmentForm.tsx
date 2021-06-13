import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"

import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function EnrollmentForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="id_card" label="Identificación" placeholder="Identificación" />
      <LabeledTextField name="name" label="Nombre" placeholder="Nombre" />
      <LabeledTextField name="phone" label="Teléfono" placeholder="Teléfono" />
      <LabeledTextField name="mail" label="Correo" placeholder="Correo" />
      <LabeledSelectField
        name="defaulter"
        label="Moroso"
        options={[
          { value: false, label: "Falso" },
          { value: true, label: "Verdadero" },
        ]}
      />
      <LabeledTextField name="diseases" label="Enfermedades" placeholder="Enfermedades" />
      <LabeledTextField name="medications" label="Medicamentos" placeholder="Medicamentos" />
      <LabeledTextField
        name="contacts"
        label="Contactos de emergencia"
        placeholder="Contactos de emergencia"
      />
    </Form>
  )
}
