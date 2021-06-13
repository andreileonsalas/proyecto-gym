import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMonts from "app/monts/queries/getMonts"

const ITEMS_PER_PAGE = 100

export const MontsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ monts, hasMore }] = usePaginatedQuery(getMonts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {monts.map((mont) => (
          <li key={mont.id}>
            <Link href={Routes.ShowMontPage({ montId: mont.id })}>
              <a>{mont.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const MontsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Monts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewMontPage()}>
            <a>Create Mont</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MontsList />
        </Suspense>
      </div>
    </>
  )
}

MontsPage.authenticate = true
MontsPage.getLayout = (page) => <Layout>{page}</Layout>

export default MontsPage
