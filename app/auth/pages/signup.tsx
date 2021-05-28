import { useRouter, BlitzPage, Routes } from "blitz"
import { SignupForm } from "app/auth/components/SignupForm"
import AuthLayout from "../layouts/AuthLayout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <AuthLayout title="Registrase">{page}</AuthLayout>

export default SignupPage
