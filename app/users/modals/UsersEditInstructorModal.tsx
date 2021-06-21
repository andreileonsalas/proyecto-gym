import { FC } from "react"
import { useDisclosure } from "@chakra-ui/react"
import CoreModal from "app/core/components/CoreModal"
import SectionCard from "app/core/sections/SectionCard"
import Form, { FORM_ERROR } from "app/core/components/Form"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import { UserEditInstructorValidations } from "../validations"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import getUser from "../queries/getUser"
import editInstructorUser from "../mutations/editInstructorUser"

type Props = {
  userId: number
}

export const UsersEditInstructorModal: FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updateUser] = useMutation(editInstructorUser)
  const [user] = useQuery(getUser, {
    id: props.userId,
  })

  return (
    <CoreModal
      title="Actualizar usuario"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      trigger={
        <SectionCard
          title={user.name || ""}
          photo={user.photo || ""}
          description={`${
            user.name
          } tienes especialidades en las modalidades de ${user.specialities.join(", ")}.`}
          tag={user.role}
          duration={`${user.specialities.length} especialidades`}
          helper={`Este miembro se unió el ${user.createdAt.toLocaleDateString()}`}
        />
      }
    >
      <Form
        submitText="Guardar cambios"
        schema={UserEditInstructorValidations}
        initialValues={{
          userId: user.id,
          name: user.name || "",
          email: user.email,
          photo: user.photo || "",
          specialities: user.specialities.join(", "),
        }}
        onSubmit={async (values) => {
          try {
            await updateUser(values)
            await invalidateQuery(getUser, {
              id: props.userId,
            })
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
        <LabeledTextField name="specialities" label="Especialidades" placeholder="Yoga, Gimnasia" />
      </Form>
    </CoreModal>
  )
}

export default UsersEditInstructorModal
