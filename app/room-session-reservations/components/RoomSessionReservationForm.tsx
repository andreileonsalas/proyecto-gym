import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { Flex } from "@chakra-ui/react"
import React from "react"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function RoomSessionReservationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledSelectField
        name="paymentType"
        label="paymentType"
        placeholder="Seleccione un tipo de pago"
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
