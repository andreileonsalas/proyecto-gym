import { BlitzPage, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import AuthLayout from "../layouts/AuthLayout"
import { Text } from "@chakra-ui/layout"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div>
      {isSuccess ? (
        <div>
          <Text fontSize="lg" fontWeight="500">
            Petición enviada
          </Text>
          <Text color="gray.500" fontSize="sm">
            Si tenemos tu correo en nuestro sistema, te enviaremos las instrucciones para cambiar la
            contraseña.
          </Text>
        </div>
      ) : (
        <Form
          submitText="Envíar instrucciones de cambio"
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => (
  <AuthLayout title="Olvidé mi contraseña">{page}</AuthLayout>
)

export default ForgotPasswordPage
