import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import { useDisclosure, Button } from "@chakra-ui/react"
import { AiOutlinePlusCircle } from "react-icons/ai"
import CoreModal from "app/core/components/CoreModal"
import { RoomSessionForm, FORM_ERROR } from "app/room-sessions/components/RoomSessionForm"
import createRoomSession from "app/room-sessions/mutations/createRoomSession"

export const SessionCreateModal = () => {
  const router = useRouter()
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
        submitText="Create RoomSession"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRoomSession}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const roomSession = await createRoomSessionMutation(values)
            router.push(`/room-sessions/${roomSession.id}`)
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
