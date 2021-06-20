import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSession from "app/room-sessions/queries/getRoomSession"
import updateRoomSession, { UpdateRoomSession } from "app/room-sessions/mutations/updateRoomSession"
import { RoomSessionForm, FORM_ERROR } from "app/room-sessions/components/RoomSessionForm"

export const EditRoomSession = () => {
  const router = useRouter()
  const roomSessionId = useParam("roomSessionId", "number")
  const [roomSession, { setQueryData }] = useQuery(getRoomSession, { id: roomSessionId })
  const [updateRoomSessionMutation] = useMutation(updateRoomSession)

  return (
    <>
      <Head>
        <title>Edit RoomSession {roomSession.id}</title>
      </Head>

      <div>
        <h1>Edit RoomSession {roomSession.id}</h1>
        <pre>{JSON.stringify(roomSession)}</pre>

        <RoomSessionForm
          submitText="Update RoomSession"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateRoomSession}
          initialValues={{ ...roomSession, specialities: roomSession.specialities.join(",") }}
          onSubmit={async (values) => {
            try {
              const updated = await updateRoomSessionMutation({
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowRoomSessionPage({ roomSessionId: updated.id }))
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

const EditRoomSessionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRoomSession />
      </Suspense>

      <p>
        <Link href={Routes.RoomSessionsPage()}>
          <a>RoomSessions</a>
        </Link>
      </p>
    </div>
  )
}

EditRoomSessionPage.authenticate = true
EditRoomSessionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRoomSessionPage
