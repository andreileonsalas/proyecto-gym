import { FC } from "react"
import { Head } from "blitz"
import { Box } from "@chakra-ui/react"
import Navbar from "app/dashboard/components/Navbar"

type Props = {
  title?: string
}

export const Layout: FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title || "GimaTec"}</title>
        <link rel="icon" href="/img/gym-logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Box>
        <Navbar />
        <Box>{props.children}</Box>
      </Box>
    </>
  )
}

export default Layout
