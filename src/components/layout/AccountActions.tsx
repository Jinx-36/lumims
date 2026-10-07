import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { buttonClassName } from '../ui/Button'
import { cn } from '../../utils/cn'

export type NavigationAccountState = 'signed-out' | 'signed-in'

interface AccountActionsProps {
  accountState: 'loading' | NavigationAccountState
  className?: string
  onNavigate?: () => void
}

export function AccountActions({
  className,
  onNavigate,
  accountState,
}: AccountActionsProps) {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (accountState === 'loading') {
    return <div aria-label="Checking account" className={cn('h-9 w-36 animate-pulse rounded-pill bg-surface-alt', className)} />
  }

  async function handleSignOut() {
    setError(null)
    setIsSigningOut(true)
    const { error: signOutError } = await signOut()
    setIsSigningOut(false)
    if (signOutError) {
      setError('Could not log out. Please try again.')
      return
    }
    onNavigate?.()
    navigate('/', { replace: true })
  }

  if (accountState === 'signed-in') {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <NavLink className="text-sm font-semibold text-foreground hover:text-accent" onClick={onNavigate} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={buttonClassName({ size: 'small', variant: 'secondary' })} onClick={onNavigate} to="/profile">
          Profile
        </NavLink>
        <button className="text-sm font-semibold text-foreground hover:text-accent disabled:text-text-muted" disabled={isSigningOut} onClick={() => void handleSignOut()} type="button">
          {isSigningOut ? 'Logging out…' : 'Log out'}
        </button>
        {error ? <span className="text-sm text-accent" role="alert">{error}</span> : null}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <NavLink className="text-sm font-semibold text-foreground hover:text-accent" onClick={onNavigate} to="/login">
        Log in
      </NavLink>
      <NavLink className={buttonClassName({ size: 'small' })} onClick={onNavigate} to="/signup">
        Sign up
      </NavLink>
    </div>
  )
}
