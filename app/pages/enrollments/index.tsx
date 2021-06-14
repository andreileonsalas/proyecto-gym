import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEnrollments from "app/enrollments/queries/getEnrollments"
import { Box } from "@chakra-ui/layout"
import { Text } from "@chakra-ui/react"
import { Stat, StatHelpText, StatNumber } from "@chakra-ui/stat"
import { Button, FormLabel, FormControl, Switch, Center } from "@chakra-ui/react"

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
      <br></br>
      <div>
        <Button colorScheme="blue" fontSize="1xl">
          <Link href={Routes.NewEnrollmentPage()}>
            <a>Crear matrícula</a>
          </Link>
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button colorScheme="green" fontSize="1xl">
          {/* <Link href={Routes.NewMontPage()}> */}
          <a>Cambiar Monto</a>
          {/* </Link> */}
        </Button>
      </div>
      <br></br>
      <div>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Clientes Morosos
          </FormLabel>
          <Switch id="email-alerts" />
        </FormControl>
      </div>
      <Box display="flex" mt="4" w="100%" listStyleType="none">
        {enrollments.map((enrollment) => (
          <li key={enrollment.id}>
            <Link href={Routes.ShowEnrollmentPage({ enrollmentId: enrollment.id })}>
              <a>
                <Box
                  m="4"
                  boxShadow="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p="4"
                  width="16rem"
                >
                  <Stat>
                    <Center bg="white" h="50px" color="black">
                      <StatNumber>{enrollment.name}</StatNumber>
                    </Center>
                    <StatHelpText>
                      Fecha: {enrollment.createdAt.getDate()} /{" "}
                      {enrollment.createdAt.getMonth() + 1} / {enrollment.createdAt.getFullYear()}
                    </StatHelpText>
                    <StatHelpText>
                      Hora: {enrollment.createdAt.getHours()} : {enrollment.createdAt.getMinutes()}
                    </StatHelpText>
                    <StatHelpText>Télefono: {enrollment.phone}</StatHelpText>
                    <StatHelpText>Correo: {enrollment.mail}</StatHelpText>
                  </Stat>
                </Box>
              </a>
            </Link>
          </li>
        ))}
      </Box>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previo
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Siguiente
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
