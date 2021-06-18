import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRoom from "app/rooms/queries/getRoom"
import updateRoom, { UpdateRoom } from "app/rooms/mutations/updateRoom"
import { FORM_ERROR } from "app/rooms/components/RoomForm"
import { Box, Center, Text } from "@chakra-ui/layout"

// export const EditRoom = () => {
//   const router = useRouter()
//   const roomId = useParam("roomId", "number")
//   const [room, { setQueryData }] = useQuery(getRoom, { id: roomId })
//   const [updateRoomMutation] = useMutation(updateRoom)

//   return (
//     <>
//       <Head>
//         <title>
//           Editar sala - {room.name} ({room.id})
//         </title>
//       </Head>

//       <Center h="100vh">
//         <Box w="24rem" borderWidth="1px" borderColor="gray.200" p="4">
//           <Text fontSize="2xl" fontWeight="500" mb="4" textAlign="center">
//             Editar sala - {room.name} ({room.id})
//           </Text>
//           <div>
//             {/* <pre>{JSON.stringify(room)}</pre> */}

//             <RoomForm
//               submitText="Actualizar sala"
//               schema={UpdateRoom}
//               initialValues={{ ...room, adminId: room.adminId.toString() }}
//               onSubmit={async (values) => {
//                 try {
//                   const updated = await updateRoomMutation({
//                     ...values,
//                   })
//                   await setQueryData(updated)
//                   router.push(Routes.ShowRoomPage({ roomId: updated.id }))
//                 } catch (error) {
//                   console.error(error)
//                   return {
//                     [FORM_ERROR]: error.toString(),
//                   }
//                 }
//               }}
//             />
//           </div>

//           <Text textAlign="center" color="gray.500" mt="0.5rem" fontSize="sm">
//             <Link href={Routes.RoomsPage()}>
//               <a>Ver todos las salas</a>
//             </Link>
//           </Text>
//         </Box>
//       </Center>
//     </>
//   )
// }

const EditRoomPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{/* <EditRoom /> */}</Suspense>
    </div>
  )
}

EditRoomPage.authenticate = true
EditRoomPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRoomPage
