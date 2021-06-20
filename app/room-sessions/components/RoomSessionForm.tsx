import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function RoomSessionForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="specialities" label="specialities" placeholder="specialities" />
      <LabeledTextField
        name="maxParticipants"
        label="maxParticipants"
        placeholder="maxParticipants"
        type="number"
      />
      <LabeledTextField name="price" label="price" placeholder="price" type="number" />
      <LabeledTextField name="roomId" label="roomId" placeholder="roomId" type="number" />
      <LabeledTextField
        name="instructorId"
        label="instructorId"
        placeholder="instructorId"
        type="number"
      />
      <LabeledTextField
        name="scheduleId"
        label="scheduleId"
        placeholder="scheduleId"
        type="number"
      />
    </Form>
  )
}
