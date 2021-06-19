import { Suspense } from "react"
import { Link, useQuery, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoom from "app/rooms/queries/getRoom"
import Section from "app/core/sections/Section"
import RoomEditModal from "app/rooms/modals/RoomEditModal"
import { Box, Link as LinkUI } from "@chakra-ui/react"
import { BsArrowLeft } from "react-icons/bs"

export const Room = () => {
  const roomId = useParam("roomId", "number")
  const [room] = useQuery(getRoom, { id: roomId })

  return (
    <>
      <Section title={room.name} extraData={<RoomEditModal />}></Section>
    </>
  )
}

const ShowRoomPage: BlitzPage = () => {
  return (
    <div>
      <Link href={Routes.RoomsPage()}>
        <LinkUI
          transition="all 0.15s ease-out"
          color="blue.600"
          fontSize="xl"
          fontWeight="bold"
          display="inline-flex"
          alignItems="flex-end"
          position="absolute"
          top="5rem"
          left="1rem"
        >
          <Box as="span" ml="1">
            <BsArrowLeft size={26} />
          </Box>{" "}
          Ver todas las salas
        </LinkUI>
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <Room />
      </Suspense>
    </div>
  )
}

ShowRoomPage.authenticate = true
ShowRoomPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRoomPage
