import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSessionReservation from "app/room-session-reservations/queries/getRoomSessionReservation"
import deleteRoomSessionReservation from "app/room-session-reservations/mutations/deleteRoomSessionReservation"

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
