import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEnrollment from "app/enrollments/queries/getEnrollment"
import deleteEnrollment from "app/enrollments/mutations/deleteEnrollment"
import { Box } from "@chakra-ui/layout"
import { Text } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Stat } from "@chakra-ui/stat"

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
        <Center h="100vh">
          <Box w="24rem" borderWidth="1px" borderColor="gray.200" p="4">
            <Stat>
              <Box bg="tomato" w="100%" p={4} color="white" justifyContent="center">
                <Center>
                  <Text fontSize="4xl">{enrollment.name}</Text>
                </Center>
              </Box>
              <Text fontSize="2xl">Identificación: {enrollment.id_card}</Text>
              <Text fontSize="2xl">Correo: {enrollment.mail}</Text>
              <Text fontSize="2xl">Teléfono: {enrollment.phone}</Text>
              <Text fontSize="2xl">Enfermedades: {enrollment.diseases}</Text>
              <Text fontSize="2xl">Medicamentos: {enrollment.medications}</Text>
              <Text fontSize="2xl">Contactos: {enrollment.contacts}</Text>
            </Stat>

            <Button colorScheme="blue" fontSize="2xl">
              <Link href={Routes.EditEnrollmentPage({ enrollmentId: enrollment.id })}>
                <a>Editar</a>
              </Link>
            </Button>
            <Button
              colorScheme="red"
              type="button"
              fontSize="2xl"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteEnrollmentMutation({ id: enrollment.id })
                  router.push(Routes.EnrollmentsPage())
                }
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Eliminar
            </Button>
          </Box>
        </Center>
      </div>
    </>
  )
}

const ShowEnrollmentPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.EnrollmentsPage()}>
          <a>Volver</a>
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
