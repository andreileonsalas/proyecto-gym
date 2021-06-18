import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { Box } from "@chakra-ui/layout"
import Layout from "app/core/layouts/Layout"
import getRooms from "app/rooms/queries/getRooms"
import Section from "app/core/sections/Section"
import SectionCard from "app/core/sections/SectionCard"
import RoomCreateModal from "app/rooms/modals/RoomCreateModal"

const ITEMS_PER_PAGE = 100

export const RoomsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ rooms }] = usePaginatedQuery(getRooms, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <Section title="Salas" extraData={<RoomCreateModal />}>
      <Box display="flex" mt="4" w="100%" listStyleType="none">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link href={Routes.ShowRoomPage({ roomId: room.id })}>
              <a>
                <SectionCard
                  photo={room.photo}
                  tag={room.specialities.join(", ")}
                  title={room.name}
                  description={`Tenemos una capacidad de ${
                    room.maxCapacity
                  } pero estamos aceptando solo ${
                    room.maxCapacityAllowed
                  }. Además cubrimos las especialidades de ${room.specialities.join(", ")}`}
                  helper={`Administrador por ${room.admin.name}`}
                  duration={`${room.schedule.opens.toLocaleTimeString()} - ${room.schedule.closes.toLocaleTimeString()}`}
                />
              </a>
            </Link>
          </li>
        ))}
      </Box>
    </Section>
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
