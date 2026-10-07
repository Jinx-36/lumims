import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth/AuthProvider'
import { PasswordInput } from '../components/auth/PasswordInput'
import { Button } from '../components/ui/Button'
import { AuthPageLayout } from './AuthPageLayout'

export function ResetPasswordPage() {
  const { clearLocalSession, status, updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!password) {
      setError('Create a new password.')
      return
    }
    if (!confirmation) {
      setError('Confirm your new password.')
      return
    }
    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      const { error: updateError } = await updatePassword(password)
      if (updateError) {
        setError('We couldn’t update your password. Please request a new reset link and try again.')
        return
      }
      await clearLocalSession()
      navigate('/login', { replace: true, state: { passwordReset: true } })
    } catch {
      setError('We couldn’t update your password. Please request a new reset link and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <AuthPageLayout footer={null} lead="Checking your reset link." title="Reset your password" />
  }

  if (status !== 'authenticated') {
    return (
      <AuthPageLayout footer={<>Return to <Link to="/login">Log in</Link>.</>} lead="This reset link is invalid or has expired." title="Reset link unavailable">
        <Link className="inline-flex text-sm font-semibold text-accent hover:underline" to="/forgot-password">Request a new reset link</Link>
      </AuthPageLayout>
    )
  }

  return (
    <AuthPageLayout footer={<>Return to <Link to="/login">Log in</Link>.</>} lead="Choose a new password for your Lumims account." title="Set a new password">
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        {error ? <p className="rounded-sm border border-accent bg-accent-soft px-3 py-2 text-sm text-foreground" role="alert">{error}</p> : null}
        <PasswordInput autoComplete="new-password" disabled={isSubmitting} label="New password" onChange={(event) => setPassword(event.target.value)} placeholder="Create a new password" required value={password} />
        <PasswordInput autoComplete="new-password" disabled={isSubmitting} label="Confirm new password" onChange={(event) => setConfirmation(event.target.value)} placeholder="Re-enter your new password" required value={confirmation} />
        <Button className="w-full" disabled={isSubmitting} type="submit">{isSubmitting ? 'Saving password…' : 'Save new password'}</Button>
      </form>
    </AuthPageLayout>
  )
}
