import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { pageContainerClassName } from '../components/layout/PageContainer'
import { TopicCard } from '../components/learning/TopicCard'
import { Badge } from '../components/ui/Badge'
import { getAllTopics } from '../content/curriculum'

const topics = getAllTopics()
const lessonCount = topics.reduce((total, topic) => total + topic.lessons.length, 0)

export function LearnPage() {
  const prefersReducedMotion = useReducedMotion()

  const entrance = prefersReducedMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      }

  return (
    <main>
      <section className="border-b border-border">
        <div className={pageContainerClassName + ' py-16 sm:py-20 lg:py-24'}>
          <motion.div className="max-w-3xl" {...entrance}>
            <Badge>Learning path</Badge>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Learn photography and video with a clear path forward.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              Start with the foundations, then build camera control, exposure,
              focus, composition, GH5 photography, video, lighting, audio,
              advanced tools, and practical workflows one lesson at a time.
            </p>

            <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-5 border-y border-border py-5 text-sm sm:gap-x-12">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Topics
                </dt>
                <dd className="mt-1 font-display text-2xl text-ink">
                  {topics.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Lessons
                </dt>
                <dd className="mt-1 font-display text-2xl text-ink">
                  {lessonCount}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Approach
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  Beginner to advanced
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-sm leading-6 text-ink-muted">
              Browse every lesson freely.{' '}
              <Link className="font-semibold text-crimson underline-offset-4 hover:underline" to="/signup">
                Sign in later to save your progress.
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section aria-labelledby="curriculum-heading" className="bg-surface-muted">
        <div className={pageContainerClassName + ' py-16 sm:py-20 lg:py-24'}>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-crimson">
              Browse the curriculum
            </p>
            <h2 id="curriculum-heading" className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Follow the course in order, or begin with what you need today.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted">
              Each topic collects a focused set of short lessons, from the
              first principles of photography through practical work with your
              Lumix GH5.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-5" aria-label="Lumims curriculum topics">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
