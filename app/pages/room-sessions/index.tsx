import React, { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSessions from "app/room-sessions/queries/getRoomSessions"
import SectionCard from "app/core/sections/SectionCard"
import { Box } from "@chakra-ui/layout"
import Section from "app/core/sections/Section"

const ITEMS_PER_PAGE = 100

export const RoomSessionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ roomSessions, hasMore }] = usePaginatedQuery(getRoomSessions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  console.log(roomSessions)
  return (
    <Section title="Sesiones">
      <Box display="flex" mt="4" w="100%" listStyleType="none">
        {roomSessions.map((roomSession) => (
          <li key={roomSession.id}>
            <Link href={Routes.ShowRoomSessionPage({ roomSessionId: roomSession.id })}>
              <a>
                <SectionCard
                  photo={roomSession.room.photo}
                  tag={roomSession.specialities.join(", ")}
                  title={`Sala: ${roomSession.room.name}`}
                  description={`Tenemos una capacidad de ${
                    roomSession.room.maxCapacity
                  } pero estamos aceptando solo ${
                    roomSession.room.maxCapacityAllowed
                  }. Además cubrimos las especialidades de ${roomSession.specialities.join(", ")}`}
                  helper={`Administrador por ${roomSession.instructor.name}`}
                  duration={`${roomSession.scheduleId}`}
                />
              </a>
            </Link>
          </li>
        ))}
      </Box>
    </Section>
  )
}

const RoomSessionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>RoomSessions</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRoomSessionPage()}>
            <a>Create RoomSession</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RoomSessionsList />
        </Suspense>
      </div>
    </>
  )
}

RoomSessionsPage.authenticate = true
RoomSessionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RoomSessionsPage
