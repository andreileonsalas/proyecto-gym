import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEnrollment from "app/enrollments/queries/getEnrollment"
import updateEnrollment from "app/enrollments/mutations/updateEnrollment"
import { EnrollmentForm, FORM_ERROR } from "app/enrollments/components/EnrollmentForm"

export const EditEnrollment = () => {
  const router = useRouter()
  const enrollmentId = useParam("enrollmentId", "number")
  const [enrollment, { setQueryData }] = useQuery(getEnrollment, { id: enrollmentId })
  const [updateEnrollmentMutation] = useMutation(updateEnrollment)

  return (
    <>
      <Head>
        <title>Edit Enrollment {enrollment.id}</title>
      </Head>

      <div>
        <h1>Edit Enrollment {enrollment.id}</h1>
        <pre>{JSON.stringify(enrollment)}</pre>

        <EnrollmentForm
          submitText="Update Enrollment"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateEnrollment}
          initialValues={enrollment}
          onSubmit={async (values) => {
            try {
              const updated = await updateEnrollmentMutation({
                id: enrollment.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowEnrollmentPage({ enrollmentId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditEnrollmentPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEnrollment />
      </Suspense>

      <p>
        <Link href={Routes.EnrollmentsPage()}>
          <a>Enrollments</a>
        </Link>
      </p>
    </div>
  )
}

EditEnrollmentPage.authenticate = true
EditEnrollmentPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditEnrollmentPage
