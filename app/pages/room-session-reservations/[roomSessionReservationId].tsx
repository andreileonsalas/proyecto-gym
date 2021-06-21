import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSessionReservation from "app/room-session-reservations/queries/getRoomSessionReservation"
import deleteRoomSessionReservation from "app/room-session-reservations/mutations/deleteRoomSessionReservation"
import Section from "app/core/sections/Section"
import SectionHero from "app/core/sections/SectionHero"
import SectionDetails from "app/core/sections/SectionDetails"
import SessionCreateModal from "app/room-sessions/modals/SessionCreateModal"

export const RoomSessionReservation = () => {
  const router = useRouter()
  const roomSessionReservationId = useParam("roomSessionReservationId", "number")
  const [deleteRoomSessionReservationMutation] = useMutation(deleteRoomSessionReservation)
  const [roomSessionReservation] = useQuery(getRoomSessionReservation, {
    id: roomSessionReservationId,
  })

  return (
    <>
      <Head>
        <title>RoomSessionReservation {roomSessionReservation.id}</title>
      </Head>

      <div>
        <h1>RoomSessionReservation {roomSessionReservation.id}</h1>
        <pre>{JSON.stringify(roomSessionReservation, null, 2)}</pre>
        <div>
          {/** Preguntar como agregar schedule en el query. */}
          <Section title={roomSessionReservation.id.toString()}>
            <SectionHero image={roomSessionReservation.id.toString()}>
              <SectionDetails
                title={`Detalles la sala ${roomSessionReservation.id.toString()}`}
                items={[
                  { name: "Precio:", value: roomSessionReservation.id.toString() },
                  { name: "Capacidad:", value: roomSessionReservation.id.toString() },
                  { name: "Abre:", value: roomSessionReservation.id.toString() },
                ]}
                footerText={`Esta sala es administrada por ${roomSessionReservation.id.toString()}`}
              />
            </SectionHero>
          </Section>
        </div>

        <Link
          href={Routes.EditRoomSessionReservationPage({
            roomSessionReservationId: roomSessionReservation.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRoomSessionReservationMutation({ id: roomSessionReservation.id })
              router.push(Routes.RoomSessionReservationsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowRoomSessionReservationPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RoomSessionReservationsPage()}>
          <a>RoomSessionReservations</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <RoomSessionReservation />
      </Suspense>
    </div>
  )
}

ShowRoomSessionReservationPage.authenticate = true
ShowRoomSessionReservationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRoomSessionReservationPage
