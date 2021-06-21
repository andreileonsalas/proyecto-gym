import { FC } from "react"
import { useDisclosure } from "@chakra-ui/react"
import CoreModal from "app/core/components/CoreModal"
import SectionCard from "app/core/sections/SectionCard"
import Form, { FORM_ERROR } from "app/core/components/Form"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import { UserEditClientValidations } from "../validations"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import getUser from "../queries/getUser"
import editClientUser from "../mutations/editClientUser"

type Props = {
  userId: number
}

export const UsersEditClientModal: FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updateUser] = useMutation(editClientUser)
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
          description={`${user.name} tiene las enfermedades de ${user.diseases.join(
            ", "
          )} y toma ${user.medicines.join(", ")}.`}
          tag={user.role}
          duration={`${user.emergencyContacts.join(", ")}`}
          helper={`Este miembro se unió el ${user.createdAt.toLocaleDateString()}`}
        />
      }
    >
      <Form
        submitText="Guardar cambios"
        schema={UserEditClientValidations}
        initialValues={{
          userId: user.id,
          name: user.name || "",
          email: user.email,
          photo: user.photo || "",
          diseases: user.diseases.join(", "),
          emergencyContacts: user.emergencyContacts.join(", "),
          medicines: user.medicines.join(", "),
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
        <LabeledTextField
          name="diseases"
          label="Enfermedades (separadas por ,)"
          placeholder="Cancer, Sida"
        />
        <LabeledTextField
          name="medicines"
          label="Medicinas (separadas por ,)"
          placeholder="Paracetamol, Acetaminofen"
        />
        <LabeledTextField
          name="emergencyContacts"
          label="Contactos de emergencia (separados por ,)"
          placeholder="911"
        />
      </Form>
    </CoreModal>
  )
}

export default UsersEditClientModal
