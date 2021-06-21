import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSession from "app/room-sessions/queries/getRoomSession"
import deleteRoomSession from "app/room-sessions/mutations/deleteRoomSession"
import Section from "app/core/sections/Section"
import SectionHero from "app/core/sections/SectionHero"
import SectionDetails from "app/core/sections/SectionDetails"
import SessionCreateModal from "app/sessions/modals/SessionCreateModal"

export const RoomSession = () => {
  const router = useRouter()
  const roomSessionId = useParam("roomSessionId", "number")
  const [deleteRoomSessionMutation] = useMutation(deleteRoomSession)
  const [roomSession] = useQuery(getRoomSession, { id: roomSessionId })

  return (
    <>
      <Head>
        <title>RoomSession {roomSession.id}</title>
      </Head>

      <div>
        <h1>RoomSession {roomSession.id}</h1>
        <pre>{JSON.stringify(roomSession, null, 2)}</pre>
        <div>
          {/** Preguntar como agregar schedule en el query. */}
          <Section title={roomSession.room.name}>
            <SectionHero image={roomSession.room.photo}>
              <SectionDetails
                title={`Detalles la sala ${roomSession.room.name}`}
                items={[
                  { name: "Precio:", value: roomSession.price.toString() },
                  { name: "Capacidad:", value: roomSession.maxParticipants.toString() },
                  { name: "Abre:", value: roomSession.room.name },
                ]}
                footerText={`Esta sala es administrada por ${roomSession.instructor.name}`}
              />
            </SectionHero>
          </Section>
        </div>

        <Link href={Routes.EditRoomSessionPage({ roomSessionId: roomSession.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRoomSessionMutation({ id: roomSession.id })
              router.push(Routes.RoomSessionsPage())
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

const ShowRoomSessionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RoomSessionsPage()}>
          <a>RoomSessions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <RoomSession />
      </Suspense>
    </div>
  )
}

ShowRoomSessionPage.authenticate = true
ShowRoomSessionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRoomSessionPage
