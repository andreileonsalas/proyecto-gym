import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function MontForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="mont" label="Nuevo Monto" placeholder="Monto" />
      <LabeledSelectField
        name="money"
        label="Moneda"
        options={[
          { value: "CRC", label: "Colones" },
          { value: "USD", label: "Dólares" },
          { value: "EUR", label: "Euros" },
          { value: "MSN", label: "Pesos" },
        ]}
      />
    </Form>
  )
}
