import EmailPasswordForm, { FormData } from '@modules/forms/emailPassword/EmailPasswordForm'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { auth } from '@libs/nhost'

const LoginForm = (): ReactElement => {
  const [loginStatus, setLoginStatus] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async ({ email, password }: FormData): Promise<void> => {
    try {
      await auth.login(email, password)
      router.push('/')
    } catch (e) {
      // TODO use i18n to handle multilingual
      setLoginStatus("Email and password don't match")
    }
  }

  const resetLoginStatus = (): void => {
    setLoginStatus(null)
  }

  return (
    <EmailPasswordForm
      onSubmit={onSubmit}
      formStatus={loginStatus}
      action={resetLoginStatus}
      buttonLabel="Login"
    />
  )
}

export default LoginForm
