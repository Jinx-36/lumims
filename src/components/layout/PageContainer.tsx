import type { PropsWithChildren } from 'react'

export const pageContainerClassName = 'mx-auto w-full max-w-320 px-5 sm:px-10 lg:px-20 wide:px-0'

export function PageContainer({ children }: PropsWithChildren) {
  return <main className={`${pageContainerClassName} py-8`}>{children}</main>
}
