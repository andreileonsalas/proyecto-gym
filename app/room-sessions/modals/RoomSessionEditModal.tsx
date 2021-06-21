import { FC } from "react"
import { invalidateQuery, useMutation, useParam, useQuery } from "blitz"
import { useDisclosure } from "@chakra-ui/react"
import { RoomSessionEditValidations } from "../validations"
import { FORM_ERROR, RoomSessionForm } from "app/room-sessions/components/RoomSessionForm"
import CoreModal from "app/core/components/CoreModal"
import getRoomSession from "../queries/getRoomSession"
import SectionCard from "app/core/sections/SectionCard"
import updateRoomSession from "../mutations/updateRoomSession"

type Props = {
  sessionId: number
}

export const RoomSessionEditModal: FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const roomId = useParam("roomId")
  const [updateSession] = useMutation(updateRoomSession)
  const [session] = useQuery(getRoomSession, {
    id: props.sessionId,
  })

  return (
    <CoreModal
      title="Actualizar sesión"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      trigger={
        <SectionCard
          key={session.id}
          photo={session.photo}
          tag={session.specialities.join(", ")}
          title={session.name}
          description={`Esta sesión se imparte en la sala ${session.room.name} todos los ${
            session.schedule.weekDays
          } de ${session.schedule.opens.toLocaleTimeString()} a ${session.schedule.closes.toLocaleTimeString()}.`}
          helper={`Instructor: ${session.instructor.name}`}
          duration={session.schedule.weekDays.join(", ")}
        />
      }
    >
      <RoomSessionForm
        submitText="Actualizar sesión"
        schema={RoomSessionEditValidations}
        initialValues={{
          name: session.name,
          closesAt: session.schedule.closes.toTimeString().substring(0, 5),
          opensAt: session.schedule.opens.toTimeString().substring(0, 5),
          photo: session.photo,
          instructorId: session.instructorId.toString(),
          roomId: roomId?.toString(),
          specialities: session.specialities.join(", "),
          openDays: session.schedule.weekDays.join(", "),
          maxParticipants: session.maxParticipants,
          price: session.price,
          sessionId: session.id,
        }}
        onSubmit={async (values) => {
          try {
            await updateSession(values)
            await invalidateQuery(getRoomSession, {
              id: session.id,
            })
            onClose()
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </CoreModal>
  )
}

export default RoomSessionEditModal
