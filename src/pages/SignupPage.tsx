import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth/AuthProvider'
import { GoogleMark } from '../components/auth/GoogleMark'
import { PasswordInput } from '../components/auth/PasswordInput'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthPageLayout } from './AuthPageLayout'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function SignupPage() {
  const { signInWithGoogle, signUp, status } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; passwordConfirmation?: string }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  if (status === 'authenticated') {
    return <Navigate replace to="/dashboard" />
  }

  function validate() {
    const nextErrors: { email?: string; password?: string; passwordConfirmation?: string } = {}
    if (!email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!validateEmail(email)) nextErrors.email = 'Enter a valid email address.'
    if (!password) nextErrors.password = 'Create a password.'
    if (!passwordConfirmation) nextErrors.passwordConfirmation = 'Confirm your password.'
    else if (password !== passwordConfirmation) nextErrors.passwordConfirmation = 'Passwords do not match.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const { error, session } = await signUp(email.trim(), password)
      if (error) {
        setFormError('We couldn’t create your account. Please check your details and try again.')
        return
      }
      if (session) {
        navigate('/dashboard', { replace: true })
        return
      }
      setSuccessMessage('If an account can be created with this email, check your inbox to confirm it before logging in.')
    } catch {
      setFormError('We couldn’t create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setFormError(null)
    setSuccessMessage(null)
    setIsGoogleLoading(true)

    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setFormError('Google sign-in could not be started. Please try again.')
        setIsGoogleLoading(false)
      }
    } catch {
      setFormError('Google sign-in could not be started. Please try again.')
      setIsGoogleLoading(false)
    }
  }

  if (status === 'loading') {
    return <AuthPageLayout footer={null} lead="Checking your account." title="Create an account" />
  }

  return (
    <AuthPageLayout footer={<>Already have an account? <Link to="/login">Log in</Link>.</>} lead="Save your path through photography and video fundamentals." title="Create your account">
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        {formError ? <p className="rounded-sm border border-accent bg-accent-soft px-3 py-2 text-sm text-foreground" role="alert">{formError}</p> : null}
        {successMessage ? <p className="rounded-sm border border-border bg-surface-alt px-3 py-2 text-sm text-foreground" role="status">{successMessage}</p> : null}
        <Input autoComplete="email" disabled={isSubmitting} error={errors.email} label="Email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
        <PasswordInput autoComplete="new-password" disabled={isSubmitting} error={errors.password} label="Password" onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" required value={password} />
        <PasswordInput autoComplete="new-password" disabled={isSubmitting} error={errors.passwordConfirmation} label="Confirm password" onChange={(event) => setPasswordConfirmation(event.target.value)} placeholder="Re-enter your password" required value={passwordConfirmation} />
        <Button className="w-full" disabled={isSubmitting} type="submit">{isSubmitting ? 'Creating account…' : 'Create account'}</Button>
        <div className="flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <Button className="w-full gap-2" disabled={isGoogleLoading || isSubmitting} onClick={() => void handleGoogleSignIn()} type="button" variant="secondary">
          <GoogleMark />
          {isGoogleLoading ? 'Redirecting…' : 'Continue with Google'}
        </Button>
      </form>
    </AuthPageLayout>
  )
}
