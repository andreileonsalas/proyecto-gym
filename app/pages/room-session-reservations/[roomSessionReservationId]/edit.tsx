import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSessionReservation from "app/room-session-reservations/queries/getRoomSessionReservation"
import updateRoomSessionReservation from "app/room-session-reservations/mutations/updateRoomSessionReservation"
import {
  RoomSessionReservationForm,
  FORM_ERROR,
} from "app/room-session-reservations/components/RoomSessionReservationForm"

export const EditRoomSessionReservation = () => {
  const router = useRouter()
  const roomSessionReservationId = useParam("roomSessionReservationId", "number")
  const [roomSessionReservation, { setQueryData }] = useQuery(getRoomSessionReservation, {
    id: roomSessionReservationId,
  })
  const [updateRoomSessionReservationMutation] = useMutation(updateRoomSessionReservation)

  return (
    <>
      <Head>
        <title>Edit RoomSessionReservation {roomSessionReservation.id}</title>
      </Head>

      <div>
        <h1>Edit RoomSessionReservation {roomSessionReservation.id}</h1>
        <pre>{JSON.stringify(roomSessionReservation)}</pre>

        <RoomSessionReservationForm
          submitText="Update RoomSessionReservation"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRoomSessionReservation}
          initialValues={roomSessionReservation}
          onSubmit={async (values) => {
            try {
              const updated = await updateRoomSessionReservationMutation({
                id: roomSessionReservation.id,
                ...values,
              })
              router.push(
                Routes.ShowRoomSessionReservationPage({ roomSessionReservationId: updated.id })
              )
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditRoomSessionReservationPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRoomSessionReservation />
      </Suspense>

      <p>
        <Link href={Routes.RoomSessionReservationsPage()}>
          <a>RoomSessionReservations</a>
        </Link>
      </p>
    </div>
  )
}

EditRoomSessionReservationPage.authenticate = true
EditRoomSessionReservationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRoomSessionReservationPage
