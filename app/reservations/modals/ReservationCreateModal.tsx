import { FC } from "react"
import { SessionPaymentType } from "db"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import { BsFileCheck } from "react-icons/bs"
import { useDisclosure, Button } from "@chakra-ui/react"
import { Form } from "app/core/components/Form"
import CoreModal from "app/core/components/CoreModal"
import getUserReservations from "../queries/getUserReservations"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import createReservation from "../mutations/createReservation"
import { CreateRoomSessionReservation } from "../validations"
import deleteReservation from "../mutations/deleteReservation"
import getRoomSession from "app/sessions/queries/getRoomSession"

type Props = {
  sessionId: number
}

export const ReservationCreateModal: FC<Props> = (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [reservations] = useQuery(getUserReservations, {})
  const [deleteReservationMutation] = useMutation(deleteReservation)
  const [createReservationMutation] = useMutation(createReservation)

  return (
    <CoreModal
      title="Reservar espacio"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      trigger={
        <Button colorScheme="blue" size="sm" variant="outline" leftIcon={<BsFileCheck />}>
          {reservations.map((x) => x.sessionId).includes(props.sessionId)
            ? "Cancelar reservación"
            : "Reservar espacio"}
        </Button>
      }
    >
      {!reservations.map((x) => x.sessionId).includes(props.sessionId) ? (
        <Form
          submitText="Reservar cupo"
          schema={CreateRoomSessionReservation}
          initialValues={{ sessionId: props.sessionId }}
          onSubmit={async (values) => {
            await createReservationMutation(values)
            await invalidateQuery(getUserReservations)
            await invalidateQuery(getRoomSession, {
              id: props.sessionId,
            })
            onClose()
          }}
        >
          <LabeledSelectField
            label="Método de pago"
            name="paymentType"
            placeholder="Seleccione un método de pago..."
            options={[
              { value: SessionPaymentType.BEFORE_HAND, label: "Por adelantado" },
              { value: SessionPaymentType.IN_TIME, label: "En la sesión" },
            ]}
          />
        </Form>
      ) : (
        <Button
          onClick={async () => {
            await deleteReservationMutation({
              sessionId: props.sessionId,
            })
            await invalidateQuery(getUserReservations)
            await invalidateQuery(getRoomSession, {
              id: props.sessionId,
            })
            onClose()
          }}
          colorScheme="blue"
          w="100%"
        >
          Cancelar reservación
        </Button>
      )}
    </CoreModal>
  )
}

export default ReservationCreateModal
