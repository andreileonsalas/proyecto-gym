import { BlitzPage, useRouterQuery, useMutation, Routes, useRouter } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import AuthLayout from "../layouts/AuthLayout"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const router = useRouter()
  const [resetPasswordMutation] = useMutation(resetPassword, {
    onMutate: () => {
      router.replace(Routes.Home())
    },
  })

  return (
    <div>
      <Form
        submitText="Reset Password"
        schema={ResetPassword}
        initialValues={{ password: "", passwordConfirmation: "" }}
        onSubmit={async (values) => {
          try {
            await resetPasswordMutation({ ...values, token: query.token as string })
          } catch (error) {
            if (error.name === "ResetPasswordError") {
              return {
                [FORM_ERROR]: error.message,
              }
            } else {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }
        }}
      >
        <LabeledTextField name="password" label="Nueva contraseña" type="password" />
        <LabeledTextField
          name="passwordConfirmation"
          label="Confirmar nueva contraseña"
          type="password"
        />
      </Form>
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <AuthLayout title="Resetear contraseña">{page}</AuthLayout>

export default ResetPasswordPage
