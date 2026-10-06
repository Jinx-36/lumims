import { motion, useReducedMotion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

import { pageContainerClassName } from '../components/layout/PageContainer'
import { LessonBody } from '../components/learning/LessonBody'
import {
  LessonSidebar,
  MobileLessonNavigation,
} from '../components/learning/LessonNavigation'
import { buttonClassName } from '../components/ui/Button'
import {
  getLessonBySlug,
  getLessonPosition,
  getNextLesson,
  getPreviousLesson,
  getTopicBySlug,
} from '../content/curriculum'

interface LessonNotFoundProps {
  topicSlug?: string
}

function LessonNotFound({ topicSlug }: LessonNotFoundProps) {
  const topic = topicSlug ? getTopicBySlug(topicSlug) : undefined

  return (
    <main>
      <section className={pageContainerClassName + ' py-16 sm:py-20 lg:py-24'}>
        <div className="max-w-2xl">
          <p className="type-label text-accent">Lesson not found</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            This lesson could not be found.
          </h1>
          <p className="mt-5 text-base leading-7 text-ink-muted">
            {topic
              ? 'Choose another lesson from ' + topic.title + ', or return to the full curriculum.'
              : 'Return to the full curriculum to choose a topic and lesson.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {topic ? (
              <Link className={buttonClassName()} to={'/learn/' + topic.slug}>
                View {topic.title}
              </Link>
            ) : null}
            <Link
              className={buttonClassName({
                className: topic ? undefined : '',
                variant: topic ? 'secondary' : 'primary',
              })}
              to="/learn"
            >
              Browse curriculum
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function LessonLink({
  direction,
  lesson,
  topicSlug,
}: {
  direction: 'Next' | 'Previous'
  lesson: { slug: string; title: string }
  topicSlug: string
}) {
  return (
    <Link
      className="group block border-t border-border py-5 transition-colors duration-150 hover:text-accent"
      to={'/learn/' + topicSlug + '/' + lesson.slug}
    >
      <span className="type-label text-ink-muted">{direction} lesson</span>
      <span className="mt-2 block text-sm font-semibold leading-6 text-ink group-hover:text-accent">
        {direction === 'Previous' ? '← ' : ''}
        {lesson.title}
        {direction === 'Next' ? ' →' : ''}
      </span>
    </Link>
  )
}

export function LessonPage() {
  const { lessonSlug, topicSlug } = useParams()
  const result = getLessonBySlug(topicSlug ?? '', lessonSlug ?? '')
  const shouldReduceMotion = useReducedMotion()

  if (!result) {
    return <LessonNotFound topicSlug={topicSlug} />
  }

  const { lesson, topic } = result
  const lessonPosition = getLessonPosition(topic.slug, lesson.slug)
  const previousLesson = getPreviousLesson(topic.slug, lesson.slug)
  const nextLesson = getNextLesson(topic.slug, lesson.slug)
  const entrance = shouldReduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25, ease: 'easeOut' as const },
      }

  return (
    <main>
      <div className={pageContainerClassName + ' py-8 sm:py-10 lg:py-12'}>
        <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,42.5rem)] lg:gap-12">
          <LessonSidebar
            currentLessonSlug={lesson.slug}
            lessons={topic.lessons}
            topic={topic}
            topicSlug={topic.slug}
          />

          <article className="min-w-0">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
                <li>
                  <Link className="hover:text-accent hover:underline" to="/learn">
                    Learn
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link className="hover:text-accent hover:underline" to={'/learn/' + topic.slug}>
                    {topic.title}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{lesson.title}</li>
              </ol>
            </nav>

            <div className="mt-7">
              <MobileLessonNavigation
                currentLessonSlug={lesson.slug}
                lessons={topic.lessons}
                topic={topic}
                topicSlug={topic.slug}
              />
            </div>

            <motion.header className="mt-9" {...entrance}>
              <p className="type-label text-accent">{topic.title}</p>
              <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
                {lesson.title}
              </h1>
              <p className="mt-5 text-sm font-semibold text-ink-muted">
                {lessonPosition
                  ? 'Lesson ' + lessonPosition.index + ' of ' + lessonPosition.total
                  : 'Lesson'}
                {lesson.estimatedMinutes ? ' · ' + lesson.estimatedMinutes + ' min' : ''}
              </p>
            </motion.header>

            <div className="mt-10">
              <LessonBody sections={lesson.sections} />
            </div>

            <nav
              aria-label="Lesson navigation"
              className={
                'mt-12 grid gap-x-8 ' +
                (previousLesson && nextLesson ? 'sm:grid-cols-2' : 'sm:grid-cols-1')
              }
            >
              {previousLesson ? (
                <LessonLink
                  direction="Previous"
                  lesson={previousLesson.lesson}
                  topicSlug={previousLesson.topic.slug}
                />
              ) : null}
              {nextLesson ? (
                <LessonLink
                  direction="Next"
                  lesson={nextLesson.lesson}
                  topicSlug={nextLesson.topic.slug}
                />
              ) : null}
            </nav>
          </article>
        </div>
      </div>
    </main>
  )
}
