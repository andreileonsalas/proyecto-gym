import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSessionReservations from "app/reservations/queries/getRoomSessionReservations"
import SectionCard from "app/core/sections/SectionCard"
import { Box } from "@chakra-ui/layout"
import Section from "app/core/sections/Section"

const ITEMS_PER_PAGE = 100

export const RoomSessionReservationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ roomSessionReservations, hasMore }] = usePaginatedQuery(getRoomSessionReservations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Section title="Sesiones">
      <Box display="flex" mt="4" w="100%" listStyleType="none">
        {roomSessionReservations.map((roomSessionReservations) => (
          <li key={roomSessionReservations.id}>
            <Link
              href={Routes.ShowRoomSessionReservationPage({
                roomSessionReservationId: roomSessionReservations.id,
              })}
            >
              <a>
                <SectionCard
                  photo={"http://localhost:3000/img/gym-logo.png"}
                  tag={roomSessionReservations.totalHours.toString()}
                  title={`Sala: ${roomSessionReservations.id}`}
                  description={`El precio de la reservacion s ${roomSessionReservations.totalHours} la cual el estado con respecto al pago es de:  ${roomSessionReservations.paid}. Y el tipo de pago es  ${roomSessionReservations.paymentType}`}
                  duration={`${roomSessionReservations.totalHours}`}
                  helper={roomSessionReservations.totalHours.toString()}
                />
              </a>
            </Link>
          </li>
        ))}
      </Box>
    </Section>
  )
}

const RoomSessionReservationsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>RoomSessionReservations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRoomSessionReservationPage()}>
            <a>Create RoomSessionReservation</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RoomSessionReservationsList />
        </Suspense>
      </div>
    </>
  )
}

RoomSessionReservationsPage.authenticate = true
RoomSessionReservationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RoomSessionReservationsPage
