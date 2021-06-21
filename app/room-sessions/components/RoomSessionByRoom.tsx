import SectionCard from "app/core/sections/SectionCard"
import { useParam, useQuery } from "blitz"
import getRoomSessions from "../queries/getRoomSessions"

export const RoomSessionByRomm = () => {
  const roomId = useParam("roomId", "number")

  const [sessions] = useQuery(getRoomSessions, {
    where: {
      roomId,
    },
  })

  return (
    <>
      {sessions.roomSessions.map((session) => (
        <SectionCard
          key={session.id}
          photo={session.photo}
          tag={session.specialities.join(", ")}
          title={session.name}
          description={`Esta sesión se imparte en la sala ${session.room.name} todos los ${
            session.schedule.weekDays
          } de ${session.schedule.opens.toLocaleTimeString()} a ${session.schedule.closes.toLocaleTimeString()}.`}
          helper={`Instructor: ${session.instructor.name}`}
          duration={session.schedule.weekDays.join(", ")}
        />
      ))}
    </>
  )
}

export default RoomSessionByRomm
