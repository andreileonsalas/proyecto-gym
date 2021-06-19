import { List, ListItem, Text, Box, Divider, Flex } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
  title: string
  items: { name: string; value: string }[]
  footerText: string
}

export const SectionDetails: FC<Props> = (props) => {
  return (
    <Flex h="100%" direction="column">
      <Box flex="1" p="4">
        <Text fontWeight="600" fontSize="2xl" textAlign="center" color="blue.800">
          {props.title}
        </Text>
        <Divider mb="2" />
        <List spacing={3}>
          {props.items.map((item, i) => (
            <ListItem key={i}>
              <Text fontWeight="600" fontSize="xl" as="span" mr="1">
                {item.name}
              </Text>
              <Text as="span" fontSize="lg" color="gray.600">
                {item.value}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box textAlign="center" p="4" backgroundColor="gray.200" color="gray.600">
        {props.footerText}
      </Box>
    </Flex>
  )
}

export default SectionDetails
