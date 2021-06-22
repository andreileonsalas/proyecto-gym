import { useQuery, Link, Routes } from "blitz"
import SectionCard from "app/core/sections/SectionCard"
import getRoomSessions from "../queries/getRoomSessions"
import getUserReservations from "app/reservations/queries/getUserReservations"

export const RoomSessionAll = (selectedUserId: any) => {
  const [sessions] = useQuery(getRoomSessions, {})
  const [reservations] = useQuery(getUserReservations, {
    where: {
      where: {
        userId: selectedUserId,
      },
    },
  })

  return (
    <>
      {sessions.roomSessions.map((session) => (
        <Link key={session.id} href={Routes.ShowSessionPage({ sessionId: session.id })}>
          <a>
            <SectionCard
              key={session.id}
              photo={session.photo}
              tag={
                session.specialities.join(", ") +
                (reservations.map((x) => x.sessionId).includes(session.id) ? " - MATRICULADO" : "")
              }
              title={session.name}
              description={`Esta sesión se imparte en la sala ${session.room.name} todos los ${
                session.schedule.weekDays
              } de ${session.schedule.opens.toLocaleTimeString()} a ${session.schedule.closes.toLocaleTimeString()}.`}
              helper={`Instructor: ${session.instructor.name}`}
              duration={session.schedule.weekDays.join(", ")}
            />
          </a>
        </Link>
      ))}
    </>
  )
}

export default RoomSessionAll
