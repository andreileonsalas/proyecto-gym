import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, Avatar } from "@chakra-ui/react"
import { useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { AuthModal } from "app/auth/modals/AuthModal"

export const UserInfo = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

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
