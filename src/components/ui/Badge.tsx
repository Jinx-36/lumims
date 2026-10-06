import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type BadgeVariant = 'neutral' | 'accent'
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-alt text-muted',
  accent: 'bg-accent-soft text-accent-strong',
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return <span className={cn('type-label inline-flex items-center rounded-pill px-3 py-1', variantClasses[variant], className)} {...props} />
}
