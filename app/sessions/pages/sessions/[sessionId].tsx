import { Suspense } from "react"
import { Link, useQuery, useParam, BlitzPage, Routes } from "blitz"
import { Box, Link as LinkUI, Spinner } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"
import Layout from "app/core/layouts/Layout"
import Section from "app/core/sections/Section"
import SectionHero from "app/core/sections/SectionHero"
import SectionDetails from "app/core/sections/SectionDetails"
import getRoomSession from "app/sessions/queries/getRoomSession"
import ReservationCreateModal from "app/reservations/modals/ReservationCreateModal"

export const Session = () => {
  const sessionId = useParam("sessionId", "number")
  const [session] = useQuery(getRoomSession, {
    id: sessionId,
  })

  return (
    <div>
      <Section title={session.name} extraData={<ReservationCreateModal sessionId={session.id} />}>
        <SectionHero image={session.photo}>
          <SectionDetails
            title={`Detalles de la sesión ${session.name}`}
            items={[
              { name: "Sala:", value: session.room.name },
              { name: "Precio:", value: `$${session.price.toString()}` },
              { name: "Hora de inicio:", value: session.schedule.opens.toLocaleTimeString() },
              {
                name: "Hora de finalización:",
                value: session.schedule.closes.toLocaleTimeString(),
              },
              { name: "Horario:", value: session.schedule.weekDays.join(", ") },
              { name: "Especialidades:", value: session.specialities.join(", ") },
              { name: "Participantes:", value: session.maxParticipants.toString() },
              { name: "Instructor:", value: session.instructor.name || "" },
              {
                name: "Cupos disponibles:",
                value: (session.maxParticipants - session.RoomSessionReservation.length).toString(),
              },
            ]}
            footerText={`Esta sesión es dirigida por ${session.instructor.name}`}
          />
        </SectionHero>
      </Section>
    </div>
  )
}

const ShowSessionPage: BlitzPage = () => {
  return (
    <div>
      <Link href={Routes.RoomSessionsPage()}>
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
          Ver todas las sesiones
        </LinkUI>
      </Link>

      <Suspense fallback={<Spinner />}>
        <Session />
      </Suspense>
    </div>
  )
}

ShowSessionPage.authenticate = true
ShowSessionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSessionPage
