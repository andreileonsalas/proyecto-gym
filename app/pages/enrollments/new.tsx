import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEnrollment from "app/enrollments/mutations/createEnrollment"
import { EnrollmentForm, FORM_ERROR } from "app/enrollments/components/EnrollmentForm"

const NewEnrollmentPage: BlitzPage = () => {
  const router = useRouter()
  const [createEnrollmentMutation] = useMutation(createEnrollment)

  return (
    <div>
      <h1>Create New Enrollment</h1>

      <EnrollmentForm
        submitText="Create Enrollment"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateEnrollment}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const enrollment = await createEnrollmentMutation(values)
            router.push(`/enrollments/${enrollment.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.EnrollmentsPage()}>
          <a>Enrollments</a>
        </Link>
      </p>
    </div>
  )
}

NewEnrollmentPage.authenticate = true
NewEnrollmentPage.getLayout = (page) => <Layout title={"Create New Enrollment"}>{page}</Layout>

export default NewEnrollmentPage
