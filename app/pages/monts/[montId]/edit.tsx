import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMont from "app/monts/queries/getMont"
import updateMont from "app/monts/mutations/updateMont"
import { MontForm, FORM_ERROR } from "app/monts/components/MontForm"

export const EditMont = () => {
  const router = useRouter()
  const montId = useParam("montId", "number")
  const [mont, { setQueryData }] = useQuery(getMont, { id: montId })
  const [updateMontMutation] = useMutation(updateMont)

  return (
    <>
      <Head>
        <title>Edit Mont {mont.id}</title>
      </Head>

      <div>
        <h1>Edit Mont {mont.id}</h1>
        <pre>{JSON.stringify(mont)}</pre>

        <MontForm
          submitText="Update Mont"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateMont}
          initialValues={mont}
          onSubmit={async (values) => {
            try {
              const updated = await updateMontMutation({
                id: mont.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowMontPage({ montId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditMontPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMont />
      </Suspense>

      <p>
        <Link href={Routes.MontsPage()}>
          <a>Monts</a>
        </Link>
      </p>
    </div>
  )
}

EditMontPage.authenticate = true
EditMontPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditMontPage
