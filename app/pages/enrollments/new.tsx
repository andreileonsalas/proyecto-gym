import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEnrollment, { CreateEnrollment } from "app/enrollments/mutations/createEnrollment"
import { EnrollmentForm, FORM_ERROR } from "app/enrollments/components/EnrollmentForm"
import { Box, Divider } from "@chakra-ui/layout"
import { Text } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react"

const NewEnrollmentPage: BlitzPage = () => {
  const router = useRouter()
  const [createEnrollmentMutation] = useMutation(createEnrollment)

  return (
    <Center h="100vh">
      <Box w="24rem" borderWidth="1px" borderColor="gray.200" p="4">
        <Text fontSize="2xl" fontWeight="500" mb="4" textAlign="center">
          Crear nueva Matrícula
        </Text>

        <EnrollmentForm
          submitText="Nueva matrícula"
          schema={CreateEnrollment}
          initialValues={{
            id_card: "",
            name: "",
            phone: "",
            mail: "",
            defaulter: false,
            diseases: "",
            medications: "",
            contacts: "",
          }}
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
        <Divider />
        <Text textAlign="center" color="gray.500" mt="0.5rem" fontSize="sm">
          <Link href={Routes.EnrollmentsPage()}>
            <a>Ver todas las matrículas</a>
          </Link>
        </Text>
      </Box>
    </Center>
  )
}

NewEnrollmentPage.authenticate = true
NewEnrollmentPage.getLayout = (page) => <Layout title={"Create New Enrollment"}>{page}</Layout>

export default NewEnrollmentPage
