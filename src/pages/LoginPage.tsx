import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth/AuthProvider'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthPageLayout } from './AuthPageLayout'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function LoginPage() {
  const { signIn, status } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (status === 'authenticated') {
    return <Navigate replace to="/dashboard" />
  }

  function validate() {
    const nextErrors: { email?: string; password?: string } = {}
    if (!email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!validateEmail(email)) nextErrors.email = 'Enter a valid email address.'
    if (!password) nextErrors.password = 'Enter your password.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const { error } = await signIn(email.trim(), password)
      if (error) {
        const message = error.message.toLowerCase()
        setFormError(message.includes('email not confirmed') ? 'Confirm your email before logging in.' : message.includes('invalid login credentials') ? 'Email or password is incorrect.' : 'We couldn’t log you in. Please try again.')
        return
      }
      navigate('/dashboard', { replace: true })
    } catch {
      setFormError('We couldn’t log you in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <AuthPageLayout footer={null} lead="Checking your account." title="Log in" />
  }

  return (
    <AuthPageLayout footer={<>New to Lumims? <Link to="/signup">Create an account</Link>.</>} lead="Pick up your learning wherever you left off." title="Welcome back">
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        {formError ? <p className="rounded-sm border border-accent bg-accent-soft px-3 py-2 text-sm text-foreground" role="alert">{formError}</p> : null}
        <Input autoComplete="email" disabled={isSubmitting} error={errors.email} label="Email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        <Input autoComplete="current-password" disabled={isSubmitting} error={errors.password} label="Password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
        <Button className="w-full" disabled={isSubmitting} type="submit">{isSubmitting ? 'Logging in…' : 'Log in'}</Button>
      </form>
    </AuthPageLayout>
  )
}
