import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { AccountActions, type NavigationAccountState } from './AccountActions'
import { pageContainerClassName } from './PageContainer'

interface SiteHeaderProps {
  accountState?: NavigationAccountState
}

const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Learn', to: '/learn', end: false },
] as const

function primaryNavigationClassName(isActive: boolean) {
  return cn(
    'text-sm font-semibold transition-colors duration-150 hover:text-accent',
    isActive
      ? 'text-accent underline decoration-1 underline-offset-8'
      : 'text-foreground',
  )
}

interface PrimaryNavigationProps {
  className?: string
  onNavigate?: () => void
}

function PrimaryNavigation({ className, onNavigate }: PrimaryNavigationProps) {
  return (
    <nav aria-label="Primary navigation" className={cn('flex items-center gap-6', className)}>
      {navigationItems.map(({ end, label, to }) => (
        <NavLink
          className={({ isActive }) => primaryNavigationClassName(isActive)}
          end={end}
          key={to}
          onClick={onNavigate}
          to={to}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      {isOpen ? (
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      ) : (
        <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      )}
    </svg>
  )
}

export function SiteHeader({ accountState = 'signed-out' }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="border-b border-border bg-page">
      <div className={cn(pageContainerClassName, 'flex min-h-16 items-center justify-between gap-6 py-3')}>
        <NavLink aria-label="Lumims home" className="type-h2 shrink-0 leading-none text-foreground no-underline" to="/">
          Lumims
        </NavLink>

        <div className="hidden items-center gap-10 lg:flex">
          <PrimaryNavigation />
          <AccountActions accountState={accountState} />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill border border-border bg-surface text-foreground transition-colors duration-150 hover:bg-surface-alt lg:hidden"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          >
            <div className={cn(pageContainerClassName, 'space-y-6 py-6')}>
              <PrimaryNavigation className="flex-col items-start gap-5" onNavigate={closeMenu} />
              <AccountActions accountState={accountState} className="flex-col items-stretch gap-3" onNavigate={closeMenu} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
