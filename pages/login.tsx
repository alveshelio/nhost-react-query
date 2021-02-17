import { usePrivateRoute } from '@hooks/usePrivateRoute'
import Login from '@modules/auth/login/Login'
import Layout from '@modules/layout/Layout'
import FullPageLoader from '@modules/loader/FullPageLoader'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

export default function LoginPage(): ReactElement {
  const router = useRouter()
  const { redirectTo, userId, removeRedirectTo, checkingAuth } = usePrivateRoute()

  useEffect(() => {
    return () => {
      removeRedirectTo()
    }
  }, [removeRedirectTo])

  if (userId) {
    router.push(redirectTo || '/')
  }

  if (checkingAuth && userId === null) {
    return <FullPageLoader />
  }

  return !userId ? (
    <Layout>
      <Login />
    </Layout>
  ) : null
}
