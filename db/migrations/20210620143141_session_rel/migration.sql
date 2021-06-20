-- DropForeignKey
ALTER TABLE "RoomSessionReservation" DROP CONSTRAINT "RoomSessionReservation_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "RoomSessionReservation" ADD FOREIGN KEY ("sessionId") REFERENCES "RoomSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
