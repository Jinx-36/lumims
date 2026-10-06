import type {
  ExerciseLessonSection,
  Gh5SetupLessonSection,
  KeyTakeawaysLessonSection,
  LessonSection,
  MediaLessonSection,
  TextLessonSection,
  TheoryLessonSection,
  TipLessonSection,
  WarningLessonSection,
} from '../../types'
import { Card } from '../ui/Card'

interface LessonBodyProps {
  sections: readonly LessonSection[]
}

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-5 text-base leading-7 text-ink">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

function TextSection({ paragraphs }: TextLessonSection) {
  return <Paragraphs paragraphs={paragraphs} />
}

function MediaSection({ alt, aspectRatio = 'photo', caption, src }: MediaLessonSection) {
  const aspectRatioClassName = {
    photo: 'aspect-[4/3]',
    video: 'aspect-video',
    square: 'aspect-square',
  }[aspectRatio]

  return (
    <figure className="space-y-3">
      <img
        alt={alt}
        className={aspectRatioClassName + ' w-full rounded-md border border-border object-cover'}
        loading="lazy"
        src={src}
      />
      {caption ? <figcaption className="text-sm leading-6 text-ink-muted">{caption}</figcaption> : null}
    </figure>
  )
}

function TheoryBlock({ paragraphs, title }: TheoryLessonSection) {
  return (
    <Card className="border-l-4 border-l-accent" surface="beige">
      <p className="type-label text-accent">Theory</p>
      <h2 className="mt-3 type-h2 text-ink">{title}</h2>
      <div className="mt-5">
        <Paragraphs paragraphs={paragraphs} />
      </div>
    </Card>
  )
}

function Gh5SetupBlock({ note, settings, steps, title }: Gh5SetupLessonSection) {
  return (
    <Card className="border-l-4 border-l-accent" surface="white">
      <p className="type-label text-accent">GH5 setup</p>
      <h2 className="mt-3 type-h2 text-ink">{title}</h2>
      {settings?.length ? (
        <dl className="mt-5 grid gap-3 border-y border-border py-4 sm:grid-cols-2">
          {settings.map((setting) => (
            <div key={setting.label}>
              <dt className="type-label text-ink-muted">{setting.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{setting.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <ol className="mt-5 space-y-3 text-sm leading-6 text-ink">
        {steps.map((step, index) => (
          <li className="flex gap-3" key={step}>
            <span aria-hidden="true" className="font-semibold text-accent">
              {index + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      {note ? <p className="mt-5 text-sm leading-6 text-ink-muted">{note}</p> : null}
    </Card>
  )
}

function TipBlock({ content }: TipLessonSection) {
  return (
    <aside className="rounded-md border border-border bg-surface-alt p-6">
      <p className="type-label text-accent">Tip</p>
      <p className="mt-3 text-sm leading-6 text-ink">{content}</p>
    </aside>
  )
}

function WarningBlock({ content }: WarningLessonSection) {
  return (
    <aside className="rounded-md border border-accent-soft bg-accent-soft p-6">
      <p className="type-label text-accent-strong">Watch out</p>
      <p className="mt-3 text-sm leading-6 text-ink">{content}</p>
    </aside>
  )
}

function ExerciseBlock({
  expectedObservation,
  instructions,
  steps,
  title,
}: ExerciseLessonSection) {
  return (
    <Card surface="beige">
      <p className="type-label text-accent">Practice</p>
      <h2 className="mt-3 type-h2 text-ink">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink">{instructions}</p>
      {steps?.length ? (
        <ol className="mt-5 space-y-3 text-sm leading-6 text-ink">
          {steps.map((step, index) => (
            <li className="flex gap-3" key={step}>
              <span aria-hidden="true" className="font-semibold text-accent">
                {index + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {expectedObservation ? (
        <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-ink-muted">
          <span className="font-semibold text-ink">Notice: </span>
          {expectedObservation}
        </p>
      ) : null}
    </Card>
  )
}

function KeyTakeawaysBlock({ items }: KeyTakeawaysLessonSection) {
  return (
    <section aria-label="Key takeaways" className="border-y border-border py-6">
      <p className="type-label text-accent">Key takeaways</p>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-ink">
        {items.map((item) => (
          <li className="flex gap-3" key={item}>
            <span aria-hidden="true" className="text-accent">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function LessonSectionRenderer({ section }: { section: LessonSection }) {
  switch (section.kind) {
    case 'text':
      return <TextSection {...section} />
    case 'media':
      return <MediaSection {...section} />
    case 'theory':
      return <TheoryBlock {...section} />
    case 'gh5-setup':
      return <Gh5SetupBlock {...section} />
    case 'tip':
      return <TipBlock {...section} />
    case 'warning':
      return <WarningBlock {...section} />
    case 'exercise':
      return <ExerciseBlock {...section} />
    case 'key-takeaways':
      return <KeyTakeawaysBlock {...section} />
  }
}

export function LessonBody({ sections }: LessonBodyProps) {
  if (!sections.length) {
    return (
      <section aria-label="Lesson content" className="border-y border-border py-8">
        <p className="text-base leading-7 text-ink-muted">
          This lesson&apos;s content is being prepared.
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <LessonSectionRenderer key={section.id} section={section} />
      ))}
    </div>
  )
}
