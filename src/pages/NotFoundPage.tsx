import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title" className="space-y-4">
      <p className="text-sm font-medium">404</p>
      <h1 id="not-found-title" className="text-2xl font-semibold">
        Page not found
      </h1>
      <p className="max-w-2xl text-slate-700">The page you requested does not exist.</p>
      <Link className="underline" to="/">
        Return home
      </Link>
    </section>
  )
}
