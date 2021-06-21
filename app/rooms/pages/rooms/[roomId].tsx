import { Suspense } from "react"
import { Link, useQuery, useParam, BlitzPage, Routes } from "blitz"
import { Box, Link as LinkUI } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"
import Layout from "app/core/layouts/Layout"
import getRoom from "app/rooms/queries/getRoom"
import Section from "app/core/sections/Section"
import RoomEditModal from "app/rooms/modals/RoomEditModal"
import SectionHero from "app/core/sections/SectionHero"
import SectionDetails from "app/core/sections/SectionDetails"
import SessionCreateModal from "app/room-sessions/modals/SessionCreateModal"

export const Room = () => {
  const roomId = useParam("roomId", "number")
  const [room] = useQuery(getRoom, { id: roomId })

  return (
    <div>
      <Section title={room.name} extraData={<RoomEditModal />}>
        <SectionHero image={room.photo}>
          <SectionDetails
            title={`Detalles la sala ${room.name}`}
            items={[
              { name: "Abre:", value: room.schedule.opens.toLocaleTimeString() },
              { name: "Cierra:", value: room.schedule.closes.toLocaleTimeString() },
              { name: "Abierto los días:", value: room.schedule.weekDays.join(", ") },
              { name: "Especialidades:", value: room.specialities.join(", ") },
              { name: "Capacidad total:", value: room.maxCapacity.toString() },
              { name: "Capacidad permitida:", value: room.maxCapacityAllowed.toString() },
            ]}
            footerText={`Esta sala es administrada por ${room.admin.name}`}
          />
        </SectionHero>
      </Section>
      <Section title={`Sessiones de ${room.name}`} extraData={<SessionCreateModal />}></Section>
    </div>
  )
}

const ShowRoomPage: BlitzPage = () => {
  return (
    <div>
      <Link href={Routes.RoomsPage()}>
        <LinkUI
          transition="all 0.15s ease-out"
          color="blue.600"
          fontSize="xl"
          fontWeight="bold"
          display="inline-flex"
          alignItems="flex-end"
          position="absolute"
          top="5rem"
          left="1rem"
        >
          <Box as="span" ml="1">
            <BsArrowLeft size={26} />
          </Box>{" "}
          Ver todas las salas
        </LinkUI>
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <Room />
      </Suspense>
    </div>
  )
}

ShowRoomPage.authenticate = true
ShowRoomPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRoomPage
