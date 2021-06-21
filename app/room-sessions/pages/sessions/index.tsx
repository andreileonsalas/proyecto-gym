import React, { Suspense } from "react"
import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Section from "app/core/sections/Section"
import RoomSessionAll from "app/room-sessions/components/RoomSessionAll"

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
        <Suspense fallback={<div>Loading...</div>}>
          <RoomSessionsList />
        </Suspense>
      </div>
    </>
  )
}

RoomSessionsPage.authenticate = true
RoomSessionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RoomSessionsPage
