import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Section from "app/core/sections/Section"

const Home: BlitzPage = () => {
  return (
    <Section title="Nuevas Sesiones" footerText="Ver todas las sesiones">
      xd
    </Section>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
