// import { useLazyQuery } from '@apollo/client'
import { Button, Flex } from '@chakra-ui/react'
import { useGQLQuery } from '@hooks/useGQLQuery'
import { auth } from '@libs//nhost'
import UserMenu from '@modules/header/navigation/userMenu/UserMenu'
import { useAuth } from '@nhost/react-auth'
import Link from 'next/link'
import { GetUserByIdQuery } from 'operationTypes'
import { ReactElement, useEffect, useState } from 'react'
import { GET_USER_BY_ID } from 'src/graphql/operations/queries/userQueries'

const Navbar = (): ReactElement => {
  const [userId, setUserId] = useState<string | null>(null)
  const { signedIn } = useAuth()

  const logout = async (): Promise<void> => {
    await auth.logout()
  }

  // const [fetchUser, { data }] = useLazyQuery<GetUserByIdQuery>(GET_USER_BY_ID)

  useEffect(() => {
    if (signedIn) {
      setUserId(auth.getClaim('x-hasura-user-id'))
    }

    // if (userId) {
    //   fetchUser({
    //     variables: { id: userId },
    //     context: {
    //       headers: {
    //         'x-hasura-role': 'user',
    //       },
    //     },
    //   })
    // }
  }, [setUserId, signedIn, userId])
  const { data, isLoading, error } = useGQLQuery<GetUserByIdQuery>({
    key: 'user',
    variables: { id: userId },
    query: GET_USER_BY_ID,
  })

  if (isLoading) {
    return <span>loading...</span>
  }

  if (error) {
    return <span>error</span>
  }

  return (
    <Flex gridGap={4}>
      {signedIn ? (
        <UserMenu logout={logout} name={data.user?.displayName} avatarSrc={data.user?.avatarUrl} />
      ) : (
        <>
          <Link href="/login">
            <a>
              <Button variant="ghost">Login</Button>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <Button variant="ghost">Register</Button>
            </a>
          </Link>
        </>
      )}
    </Flex>
  )
}

export default Navbar
