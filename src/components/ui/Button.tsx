import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'text'
type ButtonSize = 'default' | 'small'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-warm-white hover:bg-accent-strong active:bg-crimson-deep disabled:bg-crimson-soft',
  secondary: 'border border-border bg-surface text-foreground hover:bg-surface-alt active:bg-beige-surface disabled:bg-surface',
  text: 'text-accent hover:text-accent-strong hover:underline active:text-crimson-deep disabled:text-text-muted',
}
const sizeClasses: Record<ButtonSize, string> = {
  default: 'min-h-11 px-5 py-2.5 text-sm',
  small: 'min-h-9 px-4 py-2 text-xs',
}

export function buttonClassName({
  className,
  size = 'default',
  variant = 'primary',
}: Pick<ButtonProps, 'className' | 'size' | 'variant'> = {}) {
  return cn(
    'inline-flex items-center justify-center rounded-pill font-sans font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, size = 'default', type, variant = 'primary', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={buttonClassName({ className, size, variant })}
      type={type ?? 'button'}
      {...props}
    />
  )
})
