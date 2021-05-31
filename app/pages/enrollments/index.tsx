import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEnrollments from "app/enrollments/queries/getEnrollments"

const ITEMS_PER_PAGE = 100

export const EnrollmentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ enrollments, hasMore }] = usePaginatedQuery(getEnrollments, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {enrollments.map((enrollment) => (
          <li key={enrollment.id}>
            <Link href={Routes.ShowEnrollmentPage({ enrollmentId: enrollment.id })}>
              <a>{enrollment.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const EnrollmentsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Enrollments</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewEnrollmentPage()}>
            <a>Create Enrollment</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <EnrollmentsList />
        </Suspense>
      </div>
    </>
  )
}

EnrollmentsPage.authenticate = true
EnrollmentsPage.getLayout = (page) => <Layout>{page}</Layout>

export default EnrollmentsPage
