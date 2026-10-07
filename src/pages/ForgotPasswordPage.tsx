import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/auth/AuthProvider'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthPageLayout } from './AuthPageLayout'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(false)

    if (!email.trim()) {
      setError('Enter your email address.')
      return
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const { error: requestError } = await requestPasswordReset(email.trim())
      if (requestError) {
        setError('We couldn’t send a reset link. Please try again.')
        return
      }
      setSuccess(true)
    } catch {
      setError('We couldn’t send a reset link. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageLayout footer={<>Remembered your password? <Link to="/login">Log in</Link>.</>} lead="We’ll send a secure link so you can choose a new password." title="Reset your password">
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        {error ? <p className="rounded-sm border border-accent bg-accent-soft px-3 py-2 text-sm text-foreground" role="alert">{error}</p> : null}
        {success ? <p className="rounded-sm border border-border bg-surface-alt px-3 py-2 text-sm text-foreground" role="status">If an account exists for that email, check your inbox for a password-reset link.</p> : null}
        <Input autoComplete="email" disabled={isSubmitting} label="Email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
        <Button className="w-full" disabled={isSubmitting} type="submit">{isSubmitting ? 'Sending link…' : 'Send reset link'}</Button>
        <Link className="block text-center text-sm font-semibold text-accent hover:underline" to="/login">Back to log in</Link>
      </form>
    </AuthPageLayout>
  )
}
