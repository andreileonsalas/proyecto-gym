import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRoomSession from "app/room-sessions/mutations/createRoomSession"
import { RoomSessionForm, FORM_ERROR } from "app/room-sessions/components/RoomSessionForm"

const NewRoomSessionPage: BlitzPage = () => {
  const router = useRouter()
  const [createRoomSessionMutation] = useMutation(createRoomSession)

  return (
    <div>
      <h1>Create New RoomSession</h1>

      <RoomSessionForm
        submitText="Create RoomSession"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRoomSession}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const roomSession = await createRoomSessionMutation(values)
            router.push(`/room-sessions/${roomSession.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RoomSessionsPage()}>
          <a>RoomSessions</a>
        </Link>
      </p>
    </div>
  )
}

NewRoomSessionPage.authenticate = true
NewRoomSessionPage.getLayout = (page) => <Layout title={"Create New RoomSession"}>{page}</Layout>

export default NewRoomSessionPage
