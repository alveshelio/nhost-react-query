import { usePrivateRoute } from '@hooks/usePrivateRoute'
import Layout from '@modules/layout/Layout'
import FullPageLoader from '@modules/loader/FullPageLoader'
import { ReactElement } from 'react'

export default function AccountPage(): ReactElement {
  const { userId } = usePrivateRoute()

  if (!userId) {
    return <FullPageLoader />
  }

  return (
    <Layout>
      <h1>Account</h1>
    </Layout>
  )
}
