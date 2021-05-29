import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRoom, { CreateRoom } from "app/rooms/mutations/createRoom"
import { RoomForm, FORM_ERROR } from "app/rooms/components/RoomForm"
import { Box, Center, Divider, Text } from "@chakra-ui/layout"

const NewRoomPage: BlitzPage = () => {
  const router = useRouter()
  const [createRoomMutation] = useMutation(createRoom)

  return (
    <Center h="100vh">
      <Box w="24rem" borderWidth="1px" borderColor="gray.200" p="4">
        <Text fontSize="2xl" fontWeight="500" mb="4" textAlign="center">
          Crear nueva sala
        </Text>

        <RoomForm
          submitText="Crear sala"
          schema={CreateRoom}
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            try {
              const room = await createRoomMutation(values)
              router.push(`/rooms/${room.id}`)
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
          <Link href={Routes.RoomsPage()}>
            <a>Ver todos las salas</a>
          </Link>
        </Text>
      </Box>
    </Center>
  )
}

NewRoomPage.authenticate = true
NewRoomPage.getLayout = (page) => <Layout title={"Create New Room"}>{page}</Layout>

export default NewRoomPage
