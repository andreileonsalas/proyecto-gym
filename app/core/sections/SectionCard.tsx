import { Box, Flex, Image, Text, Heading } from "@chakra-ui/react"
import { FC } from "react"
import { BiTimeFive } from "react-icons/bi"

type Props = {
  photo: string
  tag: string
  title: string
  description: string
  helper: string
  duration: string
}

export const SectionCard: FC<Props> = (props) => {
  return (
    <Box cursor="pointer" backgroundColor="white" boxShadow="base" rounded="md" overflow="hidden">
      <Flex borderColor="gray.200" direction="column" overflowWrap="break-word">
        <Image src={props.photo} alt="Foto" h="60" objectFit="cover" />
        <Box px="6" py="5">
          <Text
            textTransform="uppercase"
            letterSpacing="0.05em"
            fontSize="xs"
            fontWeight="600"
            mb="2"
            color="gray.500"
          >
            {props.tag}
          </Text>
          <Heading fontWeight="700" fontSize="md" lineHeight="base" mb="2">
            {props.title}
          </Heading>
          <Text isTruncated noOfLines={2} mb="8" color="gray.600">
            {props.description}
          </Text>
          <Flex justifyContent="space-between" alignItems="center" fontSize="sm" color="gray.600">
            <Text>{props.helper}</Text>
            <Flex alignItems="center">
              <BiTimeFive size={17} />
              <Text ml="2">{props.duration}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default SectionCard
