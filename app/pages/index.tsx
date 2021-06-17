import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Section from "app/core/sections/Section"
import SectionCard from "app/core/sections/SectionCard"

const Home: BlitzPage = () => {
  return (
    <Section title="Nuevas Sesiones" footerText="Ver todas las sesiones">
      <SectionCard
        photo="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1094&q=80"
        tag="Yoga"
        title="Yoga para todas las edad sin importar la condición física."
        description="Nuestra nueva clase de yoga te ayudará a mejorar tu postura y arreglará todos esos años de dolores de espalda!"
        helper="San Jose Centro"
        duration="2 horas y media"
      />
      <SectionCard
        photo="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        tag="Pesa"
        title="Pesas para fortalecimiento de muñeca y biceps."
        description="La rutina 2 veces a la semana para fortalecer los biceps y mejorar el agarre de la muñeca!"
        helper="San Jose Centro"
        duration="2 horas y media"
      />
      <SectionCard
        photo="https://images.unsplash.com/photo-1530143584546-02191bc84eb5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        tag="Bicicleta"
        title="Horas de bicicleta con vista al bosque y ruidos de fondo."
        description="La bicicleta es de los mejores ejercicios para el fortalecimiento de pantorrilla junto con una playlist de música relajante."
        helper="San Jose Centro"
        duration="2 horas y media"
      />
    </Section>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
