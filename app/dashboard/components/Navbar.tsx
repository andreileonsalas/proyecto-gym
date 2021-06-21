import {
  Box,
  Flex,
  Image,
  Text,
  Spacer,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react"
import { Routes } from "blitz"
import { GiCubes } from "react-icons/gi"
import { BiTimer } from "react-icons/bi"
import { AiOutlineMenu } from "react-icons/ai"
import { RiDashboardLine } from "react-icons/ri"
import { FiUsers } from "react-icons/fi"
import NavbarButton from "./NavbarButton"
import UserInfo from "./UserInfo"

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box backgroundColor="blue.600" w="100%">
      <Flex p={["2", "4"]} alignItems="center">
        <IconButton
          aria-label="Menu"
          size="sm"
          variant="ghost"
          color="white"
          icon={<AiOutlineMenu size={20} />}
          onClick={onToggle}
          d={["block", "none"]}
          _active={{ backgroundColor: "none" }}
          _hover={{ backgroundColor: "none" }}
        />

        <Flex>
          <Image src="./img/gym-logo.png" h={["1.5rem", "2rem"]} />
          <Text
            display={["none", "block"]}
            fontSize={["md", "xl"]}
            color="white"
            fontWeight="600"
            fontFamily="Poppins"
            ml="2"
          >
            GimnaTec
          </Text>
        </Flex>
        <Flex ml="8" display={["none", "flex"]}>
          <NavItems />
        </Flex>
        <Spacer />
        <UserInfo />
      </Flex>
      <Box>
        <Collapse in={isOpen}>
          <Flex direction="column" mb="2">
            <NavItems />
          </Flex>
        </Collapse>
      </Box>
    </Box>
  )
}

const NavItems = () => (
  <>
    <NavbarButton text="Inicio" Icon={RiDashboardLine} href={Routes.Home()} />
    <NavbarButton text="Usuarios" Icon={FiUsers} href={Routes.UsersPage()} authenticated={true} />
    <NavbarButton text="Salas" Icon={GiCubes} href={Routes.RoomsPage()} authenticated={true} />
    <NavbarButton text="Sesiones" Icon={BiTimer} href={Routes.RoomSessionsPage()} />
    <NavbarButton text="Reservaciones" Icon={BiTimer} href={Routes.RoomSessionReservationsPage()} />
  </>
)

export default Navbar
