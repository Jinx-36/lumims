import type { PropsWithChildren } from 'react'

export function PageContainer({ children }: PropsWithChildren) {
  return <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-10 lg:px-20">{children}</main>
}
