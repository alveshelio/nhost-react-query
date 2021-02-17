import { usePrivateRoute } from '@hooks/usePrivateRoute'
import Layout from '@modules/layout/Layout'
import FullPageLoader from '@modules/loader/FullPageLoader'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export default function ProfilePage(): ReactElement {
  const { pathname } = useRouter()
  const { userId, checkingAuth } = usePrivateRoute(pathname)

  if (checkingAuth && userId === null) {
    return <FullPageLoader />
  }

  return <Layout>Profile Page</Layout>
}
