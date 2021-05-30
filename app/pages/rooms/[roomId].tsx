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
          <Box m="4" boxShadow="lg" borderWidth="1px" borderColor="gray.200" p="4" width="16rem">
            <Stat>
              <Center bg="white" h="50px" color="black">
                <StatNumber>{room.name}</StatNumber>
              </Center>
              <StatHelpText>Aforo: {room.maxCapacityAllowed}</StatHelpText>
              <StatHelpText>Capacidad máxima {room.maxCapacity}</StatHelpText>
            </Stat>

            <Button colorScheme="blue">
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
