import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRoomSessionReservation from "app/reservations/mutations/createRoomSessionReservation"
import {
  RoomSessionReservationForm,
  FORM_ERROR,
} from "app/reservations/components/RoomSessionReservationForm"

const NewRoomSessionReservationPage: BlitzPage = () => {
  const router = useRouter()
  const [createRoomSessionReservationMutation] = useMutation(createRoomSessionReservation)

  return (
    <div>
      <h1>Create New RoomSessionReservation</h1>

      <RoomSessionReservationForm
        submitText="Create RoomSessionReservation"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRoomSessionReservation}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const roomSessionReservation = await createRoomSessionReservationMutation(values)
            router.push(`/room-session-reservations/${roomSessionReservation.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RoomSessionReservationsPage()}>
          <a>RoomSessionReservations</a>
        </Link>
      </p>
    </div>
  )
}

NewRoomSessionReservationPage.authenticate = true
NewRoomSessionReservationPage.getLayout = (page) => (
  <Layout title={"Create New RoomSessionReservation"}>{page}</Layout>
)

export default NewRoomSessionReservationPage
