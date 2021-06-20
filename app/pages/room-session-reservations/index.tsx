import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoomSessionReservations from "app/room-session-reservations/queries/getRoomSessionReservations"

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
    <div>
      <ul>
        {roomSessionReservations.map((roomSessionReservation) => (
          <li key={roomSessionReservation.id}>
            <Link
              href={Routes.ShowRoomSessionReservationPage({
                roomSessionReservationId: roomSessionReservation.id,
              })}
            >
              <a>{roomSessionReservation.id}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
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
