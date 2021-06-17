import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const Home: BlitzPage = () => {
  return <div>hola</div>
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
