import { useAuth } from '@nhost/react-auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { auth } from '@libs/nhost'

interface UsePrivateRouteResult {
  userId: string | null
  redirecting: boolean
  signingIn: boolean
  redirectTo: string
}

export function usePrivateRoute(): UsePrivateRouteResult {
  const [redirecting, setRedirecting] = useState(false)
  const [signingIn, setSigningIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const { signedIn } = useAuth()

  console.log('router', router)

  useEffect(() => {
    if (!signedIn) {
      setRedirecting(true)
      router.push('/login').then()
    }
    if (signedIn === null) {
      setSigningIn(true)
    }
    if (signedIn) {
      const id = auth.getClaim('x-hasura-user-id')
      setUserId(id)
    }
  }, [router, signedIn])

  return { redirectTo: router.pathname, signingIn, userId, redirecting }
}
