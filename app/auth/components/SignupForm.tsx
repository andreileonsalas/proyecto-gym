import { invalidateQuery, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { Signup } from "app/auth/validations"
import { Box, Text } from "@chakra-ui/layout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import signup from "app/auth/mutations/signup"

type SignupFormProps = {
  onSuccess?: () => void
  onToggle?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <Form
        submitText="Crear cuenta"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
            await invalidateQuery(getCurrentUser)
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              return { email: "Este email está ocupado." }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Nombre" placeholder="Tu nombre" />
        <LabeledTextField name="email" label="Email" placeholder="alguien@tec.com" />
        <LabeledTextField name="photo" label="Foto" placeholder="https://via.placeholder.com/150" />
        <LabeledTextField
          name="password"
          label="Contraseña"
          placeholder="*************"
          type="password"
        />
      </Form>
      <Box mt="1rem" textAlign="center">
        o{" "}
        <Text as="span" cursor="pointer" color="blue.500" onClick={props.onToggle}>
          iniciar sesión
        </Text>
      </Box>
    </div>
  )
}

export default SignupForm
