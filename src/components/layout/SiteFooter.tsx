import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { pageContainerClassName } from './PageContainer'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className={cn(pageContainerClassName, 'flex flex-col gap-8 py-8 sm:flex-row sm:items-end sm:justify-between')}>
        <div className="space-y-2">
          <NavLink aria-label="Lumims home" className="type-h2 inline-block leading-none text-foreground no-underline" to="/">
            Lumims
          </NavLink>
          <p className="max-w-md text-sm text-muted">Practical photography and Lumix GH5 learning, one clear step at a time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
          <NavLink className="text-foreground hover:text-accent" to="/">Home</NavLink>
          <NavLink className="text-foreground hover:text-accent" to="/learn">Learn</NavLink>
          <NavLink className="text-foreground hover:text-accent" to="/login">Log in</NavLink>
          <span className="w-full text-sm font-normal text-muted sm:w-auto">© {new Date().getFullYear()} Lumims</span>
        </div>
      </div>
    </footer>
  )
}
