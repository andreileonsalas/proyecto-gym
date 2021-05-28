import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoom from "app/rooms/queries/getRoom"
import deleteRoom from "app/rooms/mutations/deleteRoom"

export const Room = () => {
  const router = useRouter()
  const roomId = useParam("roomId", "number")
  const [deleteRoomMutation] = useMutation(deleteRoom)
  const [room] = useQuery(getRoom, { id: roomId })

  return (
    <>
      <Head>
        <title>Room {room.id}</title>
      </Head>

      <div>
        <h1>Room {room.id}</h1>
        <pre>{JSON.stringify(room, null, 2)}</pre>

        <Link href={Routes.EditRoomPage({ roomId: room.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRoomMutation({ id: room.id })
              router.push(Routes.RoomsPage())
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

const ShowRoomPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RoomsPage()}>
          <a>Rooms</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Room />
      </Suspense>
    </div>
  )
}

ShowRoomPage.authenticate = true
ShowRoomPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRoomPage
