import { useDisclosure, Button } from "@chakra-ui/react"
import { AiOutlinePlusCircle } from "react-icons/ai"
import CoreModal from "app/core/components/CoreModal"

export const SessionCreateModal = () => {
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
      xd
    </CoreModal>
  )
}

export default SessionCreateModal
