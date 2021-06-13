import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMont from "app/monts/queries/getMont"
import deleteMont from "app/monts/mutations/deleteMont"

export const Mont = () => {
  const router = useRouter()
  const montId = useParam("montId", "number")
  const [deleteMontMutation] = useMutation(deleteMont)
  const [mont] = useQuery(getMont, { id: montId })

  return (
    <>
      <Head>
        <title>Mont {mont.id}</title>
      </Head>

      <div>
        <h1>Mont {mont.id}</h1>
        <pre>{JSON.stringify(mont, null, 2)}</pre>

        <Link href={Routes.EditMontPage({ montId: mont.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteMontMutation({ id: mont.id })
              router.push(Routes.MontsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowMontPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.MontsPage()}>
          <a>Monts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Mont />
      </Suspense>
    </div>
  )
}

ShowMontPage.authenticate = true
ShowMontPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMontPage
