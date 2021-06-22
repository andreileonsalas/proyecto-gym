import { Suspense } from "react"
import { Head, BlitzPage } from "blitz"
import { Spinner } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import Section from "app/core/sections/Section"
import RoomSessionAll from "app/sessions/components/RoomSessionAll"

export const RoomSessionsList = () => {
  return (
    <Section title="Sesiones">
      <RoomSessionAll />
    </Section>
  )
}

const RoomSessionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Sesiones</title>
      </Head>

      <div>
        <Suspense fallback={<Spinner />}>
          <RoomSessionsList />
        </Suspense>
      </div>
    </>
  )
}

RoomSessionsPage.authenticate = true
RoomSessionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RoomSessionsPage
