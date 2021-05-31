import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoom from "app/rooms/queries/getRoom"
import deleteRoom from "app/rooms/mutations/deleteRoom"
import { Text } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Center, Square, Circle } from "@chakra-ui/react"
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat"
export const Room = () => {
  const router = useRouter()
  const roomId = useParam("roomId", "number")
  const [deleteRoomMutation] = useMutation(deleteRoom)
  const [room] = useQuery(getRoom, { id: roomId })

  return (
    <>
      <div>
        <Center h="100vh">
          <Box w="24rem" borderWidth="1px" borderColor="gray.200" p="4">
            <Stat>
              <Box bg="tomato" w="100%" p={4} color="white" justifyContent="center">
                <Text fontSize="4xl">{room.name}</Text>
              </Box>
              <Text fontSize="2xl">Aforo: {room.maxCapacityAllowed}</Text>
              <Text fontSize="2xl">Capacidad máxima :{room.maxCapacity}</Text>
              <Text fontSize="2xl">Administrador :{room.adminId}</Text>
            </Stat>

            <Button colorScheme="blue" fontSize="2xl">
              <Link href={Routes.EditRoomPage({ roomId: room.id })}>
                <a>Editar</a>
              </Link>
            </Button>
            <Button
              colorScheme="red"
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteRoomMutation({ id: room.id })
                  router.push(Routes.RoomsPage())
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

const ShowRoomPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RoomsPage()}>
          <a>Rooms</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Room />
      </Suspense>
    </div>
  )
}

ShowRoomPage.authenticate = true
ShowRoomPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRoomPage
