import { useDisclosure, Button } from "@chakra-ui/react"
import CoreModal from "app/core/components/CoreModal"
import Form, { FORM_ERROR } from "app/core/components/Form"
import { invalidateQuery, useMutation } from "blitz"
import { UserCreateValidations } from "../validations"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { AiOutlinePlusCircle } from "react-icons/ai"
import createUser from "../mutations/createUser"
import getUsers from "../queries/getUsers"

export const UsersEditAdminModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createUserMutation] = useMutation(createUser)

  return (
    <CoreModal
      title="Crear Administrador"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      trigger={
        <Button colorScheme="blue" size="sm" variant="outline" leftIcon={<AiOutlinePlusCircle />}>
          Agregar administrador
        </Button>
      }
    >
      <Form
        submitText="Crear usuarios"
        schema={UserCreateValidations}
        initialValues={{
          email: "",
          name: "",
          photo: "",
          role: "ADMIN",
        }}
        onSubmit={async (values) => {
          try {
            await createUserMutation(values)
            await invalidateQuery(getUsers)
            onClose()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              return { email: "Este email está ocupado." }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Nombre" placeholder="Andrés Chacón" />
        <LabeledTextField name="email" label="Email" placeholder="alguien@itcr.ac.cr" />
        <LabeledTextField name="photo" label="Foto" placeholder="https://via.placeholder.com/150" />
      </Form>
    </CoreModal>
  )
}

export default UsersEditAdminModal
