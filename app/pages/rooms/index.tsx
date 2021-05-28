import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRooms from "app/rooms/queries/getRooms"
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat"
import { Box } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"

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
      <Box display="flex" mt="4" listStyleType="none">
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
                    <StatLabel>{room.id}</StatLabel>
                    <StatNumber>{room.name}</StatNumber>
                    <StatHelpText>
                      {room.maxCapacityAllowed} / {room.maxCapacity}
                    </StatHelpText>
                  </Stat>
                </Box>
              </a>
            </Link>
          </li>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt="5">
        <Button disabled={page === 0} onClick={goToPreviousPage} mr="1rem">
          Anterior
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Siguiente
        </Button>
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
        <Box p="4">
          <Link href={Routes.NewRoomPage()}>
            <Button w="100%" colorScheme="orange">
              Crear sala
            </Button>
          </Link>
        </Box>

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
