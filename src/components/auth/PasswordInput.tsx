import { useState } from 'react'
import { Input, type InputProps } from '../ui/Input'

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
      {hidden ? <path d="m4 4 16 16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /> : null}
    </svg>
  )
}

export type PasswordInputProps = Omit<InputProps, 'trailingAction' | 'type'>

export function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const actionLabel = isVisible ? 'Hide password' : 'Show password'

  return (
    <Input
      {...props}
      type={isVisible ? 'text' : 'password'}
      trailingAction={(
        <button
          aria-label={actionLabel}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill text-muted transition-colors hover:text-accent"
          onClick={() => setIsVisible((visible) => !visible)}
          type="button"
        >
          <EyeIcon hidden={isVisible} />
        </button>
      )}
    />
  )
}
