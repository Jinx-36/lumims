import { motion, useReducedMotion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

import { pageContainerClassName } from '../components/layout/PageContainer'
import { LessonList } from '../components/learning/LessonList'
import { Badge } from '../components/ui/Badge'
import { buttonClassName } from '../components/ui/Button'
import { getTopicBySlug } from '../content/curriculum'
import type { Topic } from '../types'

function formatTopicNumber(order: number) {
  return String(order).padStart(2, '0')
}

function getTopicDuration(topic: Topic) {
  return topic.lessons.reduce(
    (total, lesson) => total + (lesson.estimatedMinutes ?? 0),
    0,
  )
}

function TopicNotFound() {
  return (
    <main>
      <section className={pageContainerClassName + ' py-16 sm:py-20 lg:py-24'}>
        <div className="max-w-2xl">
          <p className="type-label text-accent">Topic not found</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            This topic is not in the curriculum.
          </h1>
          <p className="mt-5 text-base leading-7 text-ink-muted">
            Return to the learning path to choose one of the available topics.
          </p>
          <Link className={buttonClassName({ className: 'mt-8' })} to="/learn">
            Browse curriculum
          </Link>
        </div>
      </section>
    </main>
  )
}

export function TopicPage() {
  const { topicSlug } = useParams()
  const topic = getTopicBySlug(topicSlug ?? '')
  const prefersReducedMotion = useReducedMotion()

  if (!topic) {
    return <TopicNotFound />
  }

  const firstLesson = topic.lessons[0]
  const lessonCount = topic.lessons.length
  const totalMinutes = getTopicDuration(topic)
  const entrance = prefersReducedMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeOut' as const },
      }

  return (
    <main>
      <section className="border-b border-border">
        <div className={pageContainerClassName + ' py-10 sm:py-14 lg:py-16'}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
              <li>
                <Link className="hover:text-accent hover:underline" to="/learn">
                  Learn
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{topic.title}</li>
            </ol>
          </nav>

          <motion.div className="mt-9 max-w-3xl" {...entrance}>
            <Badge variant="accent">Topic {formatTopicNumber(topic.order)}</Badge>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              {topic.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              {topic.description}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-border py-4 text-sm">
              <div>
                <dt className="type-label text-ink-muted">Lessons</dt>
                <dd className="mt-1 font-semibold text-ink">
                  {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
                </dd>
              </div>
              {totalMinutes > 0 ? (
                <div>
                  <dt className="type-label text-ink-muted">Estimated time</dt>
                  <dd className="mt-1 font-semibold text-ink">{totalMinutes} min</dd>
                </div>
              ) : null}
            </dl>

            {firstLesson ? (
              <Link
                className={buttonClassName({ className: 'mt-8' })}
                to={'/learn/' + topic.slug + '/' + firstLesson.slug}
              >
                Start topic
              </Link>
            ) : null}
          </motion.div>
        </div>
      </section>

      <section aria-labelledby="lesson-list-heading" className="bg-surface-muted">
        <div className={pageContainerClassName + ' py-12 sm:py-16 lg:py-20'}>
          <div className="max-w-3xl">
            <p className="type-label text-accent">Topic syllabus</p>
            <h2 id="lesson-list-heading" className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Lessons in this topic
            </h2>
            <p className="mt-4 text-sm leading-6 text-ink-muted">
              Work through the lessons in order, or open any lesson that helps
              with what you are photographing or filming today.
            </p>

            <LessonList lessons={topic.lessons} topicSlug={topic.slug} />

            <p className="mt-8 text-sm leading-6 text-ink-muted">
              You can browse every lesson without an account.{' '}
              <Link className="font-semibold text-crimson underline-offset-4 hover:underline" to="/signup">
                Sign in later to save your progress.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
