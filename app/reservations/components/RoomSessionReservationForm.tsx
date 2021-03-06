import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import React from "react"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function RoomSessionReservationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledSelectField
        name="paymentType"
        label="paymentType"
        options={[
          { value: "BEFORE_HAND", label: "BEFORE_HAND" },
          { value: "IN_TIME", label: "IN_TIME" },
        ]}
      />
      <LabeledTextField name="totalHours" label="totalHours" placeholder="" type="number" />
      <LabeledTextField name="sessionId" label="sessionId" placeholder="" type="number" />
    </Form>
  )
}
