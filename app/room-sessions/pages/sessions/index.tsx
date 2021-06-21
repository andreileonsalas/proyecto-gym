import React, { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSessions from "app/room-sessions/queries/getRoomSessions"
import SectionCard from "app/core/sections/SectionCard"
import { Box } from "@chakra-ui/layout"
import Section from "app/core/sections/Section"

export const RoomSessionsList = () => {
  const router = useRouter()
  const [{ roomSessions }] = usePaginatedQuery(getRoomSessions, {})

  return (
    <Section title="Sesiones">
      {roomSessions.map((roomSession) => (
        <Link
          key={roomSession.id}
          href={Routes.ShowRoomSessionPage({ roomSessionId: roomSession.id })}
        >
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
      ))}
    </Section>
  )
}

const RoomSessionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Sesiones</title>
      </Head>

      <div>
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
