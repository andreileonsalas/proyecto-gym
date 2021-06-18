import { useDisclosure, Button } from "@chakra-ui/react"
import { AiOutlinePlusCircle } from "react-icons/ai"
import CoreModal from "app/core/components/CoreModal"
import { RoomCreateValidation } from "../validations"
import { invalidateQuery, Routes, useMutation, useRouter } from "blitz"
import createRoom from "../mutations/createRoom"
import { FORM_ERROR } from "app/core/components/Form"
import RoomForm from "app/rooms/components/RoomForm"
import getRooms from "../queries/getRooms"

export const RoomCreateModal = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createRoomMutation] = useMutation(createRoom)
  return (
    <CoreModal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Crear sala"
      trigger={
        <Button colorScheme="blue" size="sm" variant="outline" leftIcon={<AiOutlinePlusCircle />}>
          Crear sala
        </Button>
      }
    >
      <RoomForm
        submitText="Crear sala"
        schema={RoomCreateValidation}
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          try {
            const room = await createRoomMutation(values)
            router.push(Routes.ShowRoomPage({ roomId: room.id }))
            await invalidateQuery(getRooms)
            onClose()
          } catch (error) {
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </CoreModal>
  )
}

export default RoomCreateModal
