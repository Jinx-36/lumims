import type { PropsWithChildren, ReactNode } from 'react'
import { Card } from '../components/ui/Card'

interface AuthPageLayoutProps extends PropsWithChildren {
  footer: ReactNode
  lead: string
  title: string
}

export function AuthPageLayout({ children, footer, lead, title }: AuthPageLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-320 flex-1 items-center px-5 py-12 sm:px-10 sm:py-16 lg:px-20">
      <section aria-labelledby="auth-title" className="mx-auto w-full max-w-md">
        <div className="mb-8 space-y-3">
          <p className="type-label text-accent">Lumims account</p>
          <h1 className="type-h1" id="auth-title">{title}</h1>
          <p className="type-lead text-muted">{lead}</p>
        </div>
        <Card className="space-y-6" padding="comfortable">
          {children}
        </Card>
        <div className="mt-5 text-center text-sm text-muted">{footer}</div>
      </section>
    </main>
  )
}
