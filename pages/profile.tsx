import { usePrivateRoute } from '@hooks/usePrivateRoute'
import FullPageLoader from '@modules/loader/FullPageLoader'
import { ReactElement } from 'react'
import Layout from '@modules/layout/Layout'

export default function ProfilePage(): ReactElement {
  const { redirecting, signingIn } = usePrivateRoute()

  if (redirecting || signingIn) {
    return <FullPageLoader />
  }

  return <Layout>Profile Page</Layout>
}
