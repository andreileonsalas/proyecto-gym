import { Flex, GridItem, Box, Image } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
  image: string
}

export const SectionHero: FC<Props> = (props) => {
  return (
    <GridItem
      colSpan={3}
      w="100%"
      borderWidth="1px"
      borderColor="gray.200"
      rounded="md"
      overflow="hidden"
    >
      <Flex direction={["column", "column", "row"]}>
        <Box flex="1">{props.children}</Box>
        <Box flex="1">
          <Image alt="Foto del gimnasio" src={props.image} h="100%" objectFit="cover" />
        </Box>
      </Flex>
    </GridItem>
  )
}

export default SectionHero
