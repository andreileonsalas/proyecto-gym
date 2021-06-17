import { Link, useRouter } from "blitz"
import { FC } from "react"
import { IconType } from "react-icons/lib"
import { Button } from "@chakra-ui/react"

type Props = {
  href?: any
  Icon: IconType
  text: string
}

export const NavbarButton: FC<Props> = (props) => {
  const router = useRouter()

  const isActive = router.pathname.includes(props.href?.pathname)

  if (props.href)
    return (
      <Link href={props.href}>
        <a>
          <Button
            ml="2"
            colorScheme="blue"
            w={["100%", "auto"]}
            justifyContent="flex-start"
            variant="ghost"
            backgroundColor={isActive ? "rgba(0, 0, 0, 0.16)" : "none"}
            _active={{ backgroundColor: "none" }}
            _hover={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            color="white"
            size="sm"
            leftIcon={<props.Icon size={20} color="white" />}
          >
            {props.text}
          </Button>
        </a>
      </Link>
    )

  return (
    <Button
      ml="2"
      colorScheme="blue"
      variant="ghost"
      backgroundColor={isActive ? "rgba(0, 0, 0, 0.16)" : "none"}
      _active={{ backgroundColor: "none" }}
      _hover={{ backgroundColor: "none" }}
      color="white"
      leftIcon={<props.Icon size={20} color="white" />}
    >
      {props.text}
    </Button>
  )
}
export default NavbarButton
