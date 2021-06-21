import { BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import Section from "app/core/sections/Section"
import RoomSessionAll from "app/room-sessions/components/RoomSessionAll"

const Home: BlitzPage = () => {
  return (
    <Section title="Nuevas Sesiones" footerText="Ver todas las sesiones">
      <RoomSessionAll />
    </Section>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
