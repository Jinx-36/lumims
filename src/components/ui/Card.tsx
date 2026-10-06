import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type CardSurface = 'white' | 'beige'
type CardPadding = 'none' | 'comfortable'
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
  surface?: CardSurface
}

const surfaceClasses: Record<CardSurface, string> = {
  white: 'bg-surface',
  beige: 'bg-surface-alt',
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  comfortable: 'p-6 sm:p-8',
}

export function Card({ className, padding = 'comfortable', surface = 'white', ...props }: CardProps) {
  return <div className={cn('rounded-md border border-border text-foreground shadow-1', surfaceClasses[surface], paddingClasses[padding], className)} {...props} />
}
