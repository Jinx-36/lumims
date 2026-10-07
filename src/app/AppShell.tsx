import type { PropsWithChildren } from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

export function AppShell({ children }: PropsWithChildren) {
  const { status } = useAuth()
  const accountState = status === 'authenticated' ? 'signed-in' : status === 'unauthenticated' ? 'signed-out' : 'loading'
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader authStatus={accountState} />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
