import { useParam, useQuery } from "blitz"
import RoomSessionEditModal from "app/room-sessions/modals/RoomSessionEditModal"
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
        <RoomSessionEditModal key={session.id} sessionId={session.id} />
      ))}
    </>
  )
}

export default RoomSessionByRomm
