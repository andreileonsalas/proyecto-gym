import { useDisclosure, Button } from "@chakra-ui/react"
import CoreModal from "app/core/components/CoreModal"
import { invalidateQuery, useMutation, useParam, useQuery } from "blitz"
import getRoom from "../queries/getRoom"
import { AiOutlineEdit } from "react-icons/ai"
import RoomForm, { FORM_ERROR } from "../components/RoomForm"
import { RoomEditValidation } from "../validations"
import getRooms from "../queries/getRooms"
import updateRoom from "../mutations/updateRoom"

export const RoomEditModal = () => {
  const roomId = useParam("roomId", "number")
  const [room] = useQuery(getRoom, { id: roomId })
  const [updateRoomMutation] = useMutation(updateRoom)
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <CoreModal
      title={room.name}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      trigger={
        <Button colorScheme="blue" size="sm" variant="outline" leftIcon={<AiOutlineEdit />}>
          Ver detalles
        </Button>
      }
    >
      <RoomForm
        submitText="Guardar cambios"
        schema={RoomEditValidation}
        initialValues={{
          roomId: room.id,
          name: room.name,
          maxCapacity: room.maxCapacity,
          maxCapacityAllowed: room.maxCapacityAllowed,
          photoUrl: room.photo,
          specialities: room.specialities.join(", "),
          adminId: room.adminId.toString(),
          closesAt: room.schedule.closes.toTimeString().substring(0, 5),
          opensAt: room.schedule.opens.toTimeString().substring(0, 5),
          openDays: room.schedule.weekDays.join(", "),
        }}
        onSubmit={async (values) => {
          try {
            await updateRoomMutation(values)
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

export default RoomEditModal
