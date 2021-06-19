import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Button, Avatar } from "@chakra-ui/react"
import { invalidateQuery, Routes, useMutation, useRouter } from "blitz"
import logout from "app/auth/mutations/logout"
import { AuthModal } from "app/auth/modals/AuthModal"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const UserInfo = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [logoutMutation] = useMutation(logout, {
    onMutate: async () => {
      await invalidateQuery(getCurrentUser)
      router.replace(Routes.Home())
    },
  })

  return (
    <>
      {user && (
        <>
          <Avatar
            name={user.name || ""}
            size="sm"
            ml="0.5rem"
            cursor="pointer"
            alt={user.name}
            src=""
            borderWidth="1px"
            borderColor="white"
          />
          <Button ml="2" variant="link" color="white" onClick={async () => await logoutMutation()}>
            Cerrar sesión
          </Button>
        </>
      )}
      {!user && <AuthModal />}
    </>
  )
}

export default UserInfo
