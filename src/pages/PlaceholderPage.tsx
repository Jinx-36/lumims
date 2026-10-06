interface PlaceholderPageProps {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section aria-labelledby="page-title" className="space-y-3">
      <h1 id="page-title" className="text-2xl font-semibold">
        {title}
      </h1>
      <p className="max-w-2xl text-slate-700">{description}</p>
    </section>
  )
}
