import { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEnrollments from "app/enrollments/queries/getEnrollments"
import { Stat, StatHelpText } from "@chakra-ui/stat"
import { Box, Text } from "@chakra-ui/layout"

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
      <Box bg="tomato" w="100%" p={4} color="white" justifyContent="center">
        <Text fontSize="4xl">Matrícula Gym TEC </Text>
      </Box>

      <Box display="flex" mt="4" w="100%" listStyleType="none">
        {enrollments.map((enrollment) => (
          <li key={enrollment.id}>
            <Link href={Routes.ShowRoomPage({ roomId: enrollment.id })}>
              <a>
                <Box
                  m="4"
                  boxShadow="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p="4"
                  width="16rem"
                ></Box>
              </a>
            </Link>
          </li>
        ))}
      </Box>

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
