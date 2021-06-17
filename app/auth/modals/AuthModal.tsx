import { Collapse, useDisclosure } from "@chakra-ui/react"
import { BiLogIn } from "react-icons/bi"
import LoginForm from "app/auth/components/LoginForm"
import SignupForm from "app/auth/components/SignupForm"
import CoreModal from "app/core/components/CoreModal"
import NavbarButton from "app/dashboard/components/NavbarButton"

export const AuthModal = () => {
  const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useDisclosure()
  const { isOpen: isLoginOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <CoreModal
      title="Bienvenido a GimnaTec"
      isOpen={isModalOpen}
      onClose={onModalClose}
      onOpen={onModalOpen}
      trigger={<NavbarButton text="Ingresar" Icon={BiLogIn} />}
    >
      <Collapse in={isLoginOpen}>
        <LoginForm onSuccess={onModalClose} onToggle={onToggle} />
      </Collapse>
      <Collapse in={!isLoginOpen}>
        <SignupForm onSuccess={onModalClose} onToggle={onToggle} />
      </Collapse>
    </CoreModal>
  )
}
