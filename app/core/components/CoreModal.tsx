import { FC, Suspense } from "react"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { Box } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void

  trigger: JSX.Element
  title: string
  removePadding?: boolean
  closeOnContentClick?: boolean
}

export const CoreModal: FC<Props> = (props) => {
  return (
    <>
      <Box onClick={props.onOpen}>{props.trigger}</Box>
      <Modal onClose={props.onClose} isOpen={props.isOpen} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="1rem" p={props.removePadding ? "0" : "1.5rem"}>
            <Suspense fallback={<Spinner />}>{props.children}</Suspense>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CoreModal
