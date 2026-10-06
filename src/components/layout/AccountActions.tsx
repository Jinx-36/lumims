import { NavLink } from 'react-router-dom'
import { buttonClassName } from '../ui/Button'
import { cn } from '../../utils/cn'

export type NavigationAccountState = 'signed-out' | 'signed-in'

interface AccountActionsProps {
  accountState?: NavigationAccountState
  className?: string
  onNavigate?: () => void
}

export function AccountActions({
  accountState = 'signed-out',
  className,
  onNavigate,
}: AccountActionsProps) {
  if (accountState === 'signed-in') {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <NavLink className="text-sm font-semibold text-foreground hover:text-accent" onClick={onNavigate} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={buttonClassName({ size: 'small', variant: 'secondary' })} onClick={onNavigate} to="/profile">
          Profile
        </NavLink>
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
