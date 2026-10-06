import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  hint?: string
  label: string
  wrapperClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, hint, id, label, required, wrapperClassName, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
  return (
    <div className={cn('space-y-2', wrapperClassName)}>
      <label className="type-label block text-foreground" htmlFor={inputId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        ref={ref}
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        className={cn(
          'min-h-11 w-full rounded-sm border bg-surface px-3 py-2 text-base text-foreground placeholder:text-text-muted focus-visible:border-accent disabled:cursor-not-allowed disabled:bg-surface-alt disabled:text-muted',
          error ? 'border-accent' : 'border-border',
          className,
        )}
        id={inputId}
        required={required}
        {...props}
      />
      {error ? <p className="text-sm text-accent" id={descriptionId} role="alert">{error}</p> : null}
      {!error && hint ? <p className="text-sm text-muted" id={descriptionId}>{hint}</p> : null}
    </div>
  )
})
