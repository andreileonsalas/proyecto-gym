import { BlitzPage, Head, useQuery } from "blitz"
import { Suspense } from "react"
import { Spinner } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import Section from "app/core/sections/Section"
import SectionDetails from "app/core/sections/SectionDetails"
import SectionHero from "app/core/sections/SectionHero"
import getAllCalendars from "../queries/getAllCalendars"

export const ShowCalendars = () => {
  const [schedules] = useQuery(getAllCalendars, {})
  return (
    <>
      <Section title="Calendarios de salas">
        <SectionHero image="https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80">
          <SectionDetails
            title="Calendarios de salas"
            footerText="Los calendarios se actualizan los lunes de todas las semanas."
            items={schedules.rooms.map((schedule) => ({
              name: schedule.name || "",
              value: `Todos los ${
                schedule.schedule.weekDays
              } de ${schedule.schedule.opens.toLocaleTimeString()} a ${schedule.schedule.closes.toLocaleTimeString()}`,
            }))}
          />
        </SectionHero>
      </Section>
      <Section title="Calendarios de sesiones">
        <SectionHero image="https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80">
          <SectionDetails
            title="Calendarios de sesiones"
            footerText="Los calendarios se actualizan los lunes de todas las semanas."
            items={schedules.sessions.map((schedule) => ({
              name: schedule.name,
              value: `Todos los ${
                schedule.schedule.weekDays
              } de ${schedule.schedule.opens.toLocaleTimeString()} a ${schedule.schedule.closes.toLocaleTimeString()}`,
            }))}
          />
        </SectionHero>
      </Section>
      <Section title="Calendarios de instructores">
        <SectionHero image="https://images.unsplash.com/photo-1588453251771-cd919b362ed4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80">
          <SectionDetails
            title="Calendarios de instructores"
            footerText="Los calendarios se actualizan los lunes de todas las semanas."
            items={schedules.sessions.map((schedule) => ({
              name: schedule.instructor.name || "",
              value: `Todos los ${
                schedule.schedule.weekDays
              } de ${schedule.schedule.opens.toLocaleTimeString()} a ${schedule.schedule.closes.toLocaleTimeString()}`,
            }))}
          />
        </SectionHero>
      </Section>
    </>
  )
}

export const CalendarsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Calendarios</title>
      </Head>

      <Suspense fallback={<Spinner />}>
        <ShowCalendars />
      </Suspense>
    </>
  )
}

CalendarsPage.getLayout = (page) => <Layout title="Calendarios">{page}</Layout>

export default CalendarsPage
