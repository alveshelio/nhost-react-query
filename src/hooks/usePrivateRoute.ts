import { useAuth } from '@nhost/react-auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { auth } from '@libs/nhost'
import { useLocalStorage } from 'react-use'

interface UsePrivateRouteResult {
  userId: string | null
  redirectTo: string
  removeRedirectTo: () => void
  checkingAuth: boolean
}

export function usePrivateRoute(redirectRoute?: string): UsePrivateRouteResult {
  const [redirectTo, setRedirectTo, removeRedirectTo] = useLocalStorage<string>('redirectTo')
  const [userId, setUserId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true)
  const { signedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (typeof signedIn !== 'boolean') {
      setCheckingAuth(true)
    }

    if (typeof signedIn === 'boolean') {
      setCheckingAuth(false)
    }
  }, [signedIn])

  useEffect(() => {
    if (typeof signedIn === 'boolean' && !signedIn && router.pathname !== '/login') {
      router.push('/login').then()
    }
  }, [router, signedIn])

  useEffect(() => {
    if (signedIn) {
      const id = auth.getClaim('x-hasura-user-id')
      setUserId(id)
    }
  }, [signedIn])

  useEffect(() => {
    if (typeof signedIn === 'boolean' && !signedIn) {
      if (redirectRoute && !redirectTo) {
        setRedirectTo(redirectRoute)
      }
    }
  }, [redirectRoute, redirectTo, setRedirectTo, signedIn])

  return { redirectTo, userId, removeRedirectTo, checkingAuth }
}
