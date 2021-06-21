import { useMutation, useParam, invalidateQuery } from "blitz"
import { useDisclosure, Button } from "@chakra-ui/react"
import { AiOutlinePlusCircle } from "react-icons/ai"
import CoreModal from "app/core/components/CoreModal"
import { RoomSessionForm, FORM_ERROR } from "app/room-sessions/components/RoomSessionForm"
import createRoomSession from "app/room-sessions/mutations/createRoomSession"
import { RoomSessionCreateValidations } from "../validations"
import getRoomSessions from "../queries/getRoomSessions"

export const SessionCreateModal = () => {
  const roomId = useParam("roomId")
  const [createRoomSessionMutation] = useMutation(createRoomSession)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <CoreModal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Crear sesión"
      trigger={
        <Button colorScheme="blue" size="sm" variant="outline" leftIcon={<AiOutlinePlusCircle />}>
          Crear sesión
        </Button>
      }
    >
      <RoomSessionForm
        submitText="Crear sesión"
        schema={RoomSessionCreateValidations}
        initialValues={{
          name: "",
          closesAt: "",
          photo: "",
          instructorId: "",
          roomId: roomId?.toString(),
          specialities: "",
          openDays: "",
          opensAt: "",
        }}
        onSubmit={async (values) => {
          try {
            await createRoomSessionMutation(values)
            await invalidateQuery(getRoomSessions)
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

export default SessionCreateModal
