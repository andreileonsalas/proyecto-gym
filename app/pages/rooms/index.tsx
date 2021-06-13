import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRooms from "app/rooms/queries/getRooms"
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat"
import { Box } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Center, Square, Circle } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
const ITEMS_PER_PAGE = 100

export const RoomsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ rooms, hasMore }] = usePaginatedQuery(getRooms, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Box bg="yellow.500" w="100%" p={4} color="white" justifyContent="center">
        <Text fontSize="4xl">Salas Gym TEC </Text>
      </Box>
      <Box display="flex" mt="4" w="100%" listStyleType="none">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link href={Routes.ShowRoomPage({ roomId: room.id })}>
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
                      <StatNumber>{room.name}</StatNumber>
                    </Center>
                    <StatHelpText>Aforo: {room.maxCapacityAllowed}</StatHelpText>
                    <StatHelpText>Capacidad máxima {room.maxCapacity}</StatHelpText>
                  </Stat>
                </Box>
              </a>
            </Link>
          </li>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt="5">
        <Button onClick={goToPreviousPage} mr="1rem">
          Anterior
        </Button>
        <Link href={Routes.NewRoomPage()}>
          <Button mr="1rem">Crear sala</Button>
        </Link>
      </Box>
    </div>
  )
}

const RoomsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Rooms</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <RoomsList />
        </Suspense>
      </div>
    </>
  )
}

RoomsPage.authenticate = true
RoomsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RoomsPage
