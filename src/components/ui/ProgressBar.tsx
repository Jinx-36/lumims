import { useId } from 'react'
import { cn } from '../../utils/cn'

export interface ProgressBarProps {
  className?: string
  label: string
  max?: number
  showValue?: boolean
  value: number
}

export function ProgressBar({ className, label, max = 100, showValue = true, value }: ProgressBarProps) {
  const labelId = useId()
  const safeMax = max > 0 ? max : 100
  const safeValue = Math.min(Math.max(value, 0), safeMax)
  const percentage = Math.round((safeValue / safeMax) * 100)
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-foreground" id={labelId}>{label}</span>
        {showValue ? <span className="text-sm text-muted">{percentage}%</span> : null}
      </div>
      <div
        aria-labelledby={labelId}
        aria-valuemax={safeMax}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        aria-valuetext={`${percentage}% complete`}
        className="h-2 overflow-hidden rounded-pill bg-surface-alt"
        role="progressbar"
      >
        <div className="h-full rounded-pill bg-accent" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
