import { useQuery } from "blitz"
import SectionCard from "app/core/sections/SectionCard"
import getRoomSessions from "../queries/getRoomSessions"

export const RoomSessionAll = () => {
  const [sessions] = useQuery(getRoomSessions, {})

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

export default RoomSessionAll
