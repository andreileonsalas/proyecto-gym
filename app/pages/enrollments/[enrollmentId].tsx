import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEnrollment from "app/enrollments/queries/getEnrollment"
import deleteEnrollment from "app/enrollments/mutations/deleteEnrollment"

export const Enrollment = () => {
  const router = useRouter()
  const enrollmentId = useParam("enrollmentId", "number")
  const [deleteEnrollmentMutation] = useMutation(deleteEnrollment)
  const [enrollment] = useQuery(getEnrollment, { id: enrollmentId })

  return (
    <>
      <Head>
        <title>Enrollment {enrollment.id}</title>
      </Head>

      <div>
        <h1>Enrollment {enrollment.id}</h1>
        <pre>{JSON.stringify(enrollment, null, 2)}</pre>

        <Link href={Routes.EditEnrollmentPage({ enrollmentId: enrollment.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteEnrollmentMutation({ id: enrollment.id })
              router.push(Routes.EnrollmentsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowEnrollmentPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.EnrollmentsPage()}>
          <a>Enrollments</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Enrollment />
      </Suspense>
    </div>
  )
}

ShowEnrollmentPage.authenticate = true
ShowEnrollmentPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEnrollmentPage
