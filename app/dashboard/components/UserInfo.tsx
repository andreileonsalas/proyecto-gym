import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, Avatar } from "@chakra-ui/react"
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
        <Menu closeOnSelect={true} isLazy>
          <MenuButton>
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
          </MenuButton>
          <MenuList>
            <MenuGroup title="Usuario">
              <MenuItem onClick={async () => await logoutMutation()}>Cerrar sesión</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
      {!user && <AuthModal />}
    </>
  )
}

export default UserInfo
