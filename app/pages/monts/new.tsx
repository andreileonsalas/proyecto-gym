import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createMont from "app/monts/mutations/createMont"
import { MontForm, FORM_ERROR } from "app/monts/components/MontForm"
import { Box, Text } from "@chakra-ui/layout"

const NewMontPage: BlitzPage = () => {
  const router = useRouter()
  const [createMontMutation] = useMutation(createMont)

  return (
    <div>
      <Box bg="tomato" w="100%" p={4} color="white" justifyContent="center">
        <Text fontSize="4xl">Cambiar Monto Matrícula</Text>
      </Box>

      <MontForm
        submitText="Cambiar Monto"
        // TODO use a zod schema for form validatioo
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateMont}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const mont = await createMontMutation(values)
            router.push(`/monts/${mont.id}`)
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
          <a>Matrículas</a>
        </Link>
      </p>
    </div>
  )
}

NewMontPage.authenticate = true
NewMontPage.getLayout = (page) => <Layout title={"Create New Mont"}>{page}</Layout>

export default NewMontPage
