import { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUsers from "app/users/queries/getUsers"
import { Box } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat"
import { Select } from "@chakra-ui/select"

const ITEMS_PER_PAGE = 100

export const UsersList = ({ role }: { role: string }) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ users, hasMore }] = usePaginatedQuery(getUsers, {
    where: {
      role: {
        contains: role,
      },
    },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Box display="flex" mt="4" listStyleType="none">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={Routes.ShowUserPage({ userId: user.id })}>
              <a>
                <Box
                  m="4"
                  boxShadow="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p="4"
                  width="16rem"
                >
                  <Stat>
                    <StatLabel>{user.role}</StatLabel>
                    <StatNumber>{user.name}</StatNumber>
                    <StatHelpText>{user.email}</StatHelpText>
                  </Stat>
                </Box>
              </a>
            </Link>
          </li>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt="5">
        <Button disabled={page === 0} onClick={goToPreviousPage} mr="1rem">
          Anterior
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Siguiente
        </Button>
      </Box>
    </div>
  )
}

const UsersPage: BlitzPage = () => {
  const user = useCurrentUser()
  const [filter, setFilter] = useState("")
  return (
    <>
      <Head>
        <title>Miembros</title>
      </Head>

      <div>
        <Box p="4">
          {user?.role === "ADMIN" && (
            <Link href={Routes.NewUserPage()}>
              <Button w="100%" colorScheme="orange">
                Registrar miembro (Administrador / Instructor / Miembro)
              </Button>
            </Link>
          )}
          <Select placeholder="Filtrar por..." onChange={(e) => setFilter(e.target.value)}>
            <option value="ADMIN">Administradores</option>
            <option value="INSTRUCTOR">Instructores</option>
            <option value="CLIENT">Clientes</option>
          </Select>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <UsersList role={filter} />
        </Suspense>
      </div>
    </>
  )
}

UsersPage.authenticate = true
UsersPage.getLayout = (page) => <Layout>{page}</Layout>

export default UsersPage
