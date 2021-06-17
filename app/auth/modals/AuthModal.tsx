import { useDisclosure } from "@chakra-ui/react"
import CoreModal from "app/core/components/CoreModal"
import NavbarButton from "app/dashboard/components/NavbarButton"
import { BiLogIn } from "react-icons/bi"

export const AuthModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <CoreModal
      title="Bienvenido a GimnaTec"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      trigger={<NavbarButton text="Ingresar" Icon={BiLogIn} />}
    >
      hola
    </CoreModal>
  )
}
