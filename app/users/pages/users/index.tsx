import { Suspense } from "react"
import { Role } from "db"
import { Head, usePaginatedQuery, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUsers from "app/users/queries/getUsers"
import { Text } from "@chakra-ui/layout"
import Section from "app/core/sections/Section"
import UsersEditAdminModal from "app/users/modals/UsersEditAdminModal"
import UserCreateAdminModal from "app/users/modals/UserCreateAdminModal"
import UsersEditInstructorModal from "app/users/modals/UsersEditInstructorModal"
import UserCreateInstructorModal from "app/users/modals/UserCreateInstructorModal"

export const UsersList = ({ role }: { role: Role }) => {
  const [{ users }] = usePaginatedQuery(getUsers, {
    where: {
      role: role,
    },
  })

  return (
    <>
      {users.length === 0 && <Text>No hay miembros con el role de {role}</Text>}
      {users.map((user) => {
        if (role === "ADMIN") return <UsersEditAdminModal key={user.id} userId={user.id} />

        if (role === "INSTRUCTOR")
          return <UsersEditInstructorModal key={user.id} userId={user.id} />
      })}
    </>
  )
}

const UsersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Miembros</title>
      </Head>

      <div>
        <Suspense fallback={<div>Cargando...</div>}>
          <Section title="Administradores" extraData={<UserCreateAdminModal />}>
            <UsersList role="ADMIN" />
          </Section>
          <Section title="Instructores" extraData={<UserCreateInstructorModal />}>
            <UsersList role="INSTRUCTOR" />
          </Section>
          <Section title="Clientes">
            <UsersList role="CLIENT" />
          </Section>
        </Suspense>
      </div>
    </>
  )
}

UsersPage.authenticate = true
UsersPage.getLayout = (page) => <Layout>{page}</Layout>

export default UsersPage
