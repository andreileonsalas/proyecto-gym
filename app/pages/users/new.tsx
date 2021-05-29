import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createUser, { CreateUser } from "app/users/mutations/createUser"
import { UserForm, FORM_ERROR } from "app/users/components/UserForm"
import { Box, Center, Divider, Text } from "@chakra-ui/layout"

const NewUserPage: BlitzPage = () => {
  const router = useRouter()
  const [createUserMutation] = useMutation(createUser)

  return (
    <Center h="100vh">
      <Box w="24rem" borderWidth="1px" borderColor="gray.200" p="4">
        <Text fontSize="2xl" fontWeight="500" mb="4" textAlign="center">
          Registrar miembro
        </Text>

        <UserForm
          submitText="Registrar miembro"
          schema={CreateUser}
          initialValues={{ email: "", name: "" }}
          onSubmit={async (values) => {
            try {
              const user = await createUserMutation(values)
              router.push(`/users/${user.id}`)
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
          <Link href={Routes.UsersPage()}>
            <a>Ver todos los miembros</a>
          </Link>
        </Text>
      </Box>
    </Center>
  )
}

NewUserPage.authenticate = true
NewUserPage.getLayout = (page) => <Layout title={"Crear miembro"}>{page}</Layout>

export default NewUserPage
