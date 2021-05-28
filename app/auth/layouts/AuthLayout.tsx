import { FC } from "react"
import { Head } from "blitz"
import { Box, Center, Text } from "@chakra-ui/layout"

type LayoutProps = {
  title?: string
}

const AuthLayout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Unio"}</title>
        <link rel="icon" href="/img/unio-favicon.png" />
      </Head>

      <Center h="100vh">
        <Box boxShadow="lg" border="1px" borderColor="gray.200" backgroundColor="white">
          <Box flex="1" w="24rem">
            <Box p="4">
              <Box textAlign="center" marginX="2rem">
                <Text
                  bgGradient="linear(to-l, yellow.500,orange.500)"
                  bgClip="text"
                  fontSize="6xl"
                  fontWeight="extrabold"
                >
                  Gym
                </Text>
                <Text textTransform="uppercase" fontSize="lg">
                  {title}
                </Text>
              </Box>
            </Box>
            <Box p="4" paddingTop="8">
              {children}
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  )
}

export default AuthLayout
