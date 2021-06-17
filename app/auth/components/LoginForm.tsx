import { AuthenticationError, useMutation, invalidateQuery } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { Login } from "app/auth/validations"
import { Box, Text } from "@chakra-ui/layout"

type LoginFormProps = {
  onSuccess?: () => void
  onToggle?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <Form
        submitText="Iniciar sesión"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            await invalidateQuery(getCurrentUser)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Estos credenciales son inválidos." }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
        />
      </Form>

      <Box mt="1rem" textAlign="center">
        o{" "}
        <Text as="span" cursor="pointer" color="blue.500" onClick={props.onToggle}>
          registrate
        </Text>
      </Box>
    </div>
  )
}

export default LoginForm
