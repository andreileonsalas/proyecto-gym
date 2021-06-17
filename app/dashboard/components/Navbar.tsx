import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { Routes } from "blitz"
import { GiCubes } from "react-icons/gi"
import { BiTimer } from "react-icons/bi"
import { RiDashboardLine } from "react-icons/ri"
import NavbarButton from "./NavbarButton"

export const Navbar = () => {
  return (
    <Box backgroundColor="blue.600">
      <Flex p="4" alignItems="center">
        <Flex>
          <Image src="./img/gym-logo.png" h="2rem" />
          <Text fontSize="xl" color="white" fontWeight="600" fontFamily="Poppins" ml="2">
            GimaTec
          </Text>
        </Flex>
        <Flex ml="8">
          <NavbarButton text="Inicio" Icon={RiDashboardLine} href={Routes.Home()} />
          <NavbarButton text="Salas" Icon={GiCubes} href={Routes.RoomsPage()} />
          <NavbarButton text="Sesiones" Icon={BiTimer} href={Routes.RoomsPage()} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
