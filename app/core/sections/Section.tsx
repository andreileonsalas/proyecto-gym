import { Box, Grid, Heading, Link, Flex } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import { BsArrowRight } from "react-icons/bs"

type Props = {
  title: string
  footerText?: string
  extraData?: ReactNode
  onFooterClick?: () => void
}

export const Section: FC<Props> = (props) => {
  return (
    <Box py="24">
      <Box maxW="7xl" px="8" mx="auto">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading fontSize="4xl" lineHeight="1.2" fontWeight="800" mb="8" color="blue.800">
            {props.title}
          </Heading>
          {props.extraData}
        </Flex>

        <Grid
          gap="12"
          templateColumns={["repeat(1, minmax(0px, 1fr))", "repeat(3, minmax(0px, 1fr))"]}
          mb="10"
        >
          {props.children}
        </Grid>
        {props.footerText && (
          <Link
            transition="all 0.15s ease-out"
            color="blue.600"
            fontSize="xl"
            fontWeight="bold"
            display="inline-flex"
            alignItems="flex-end"
          >
            {props.footerText}{" "}
            <Box as="span" ml="1">
              <BsArrowRight size={26} />
            </Box>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default Section
