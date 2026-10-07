import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import type { Lesson, Topic } from '../../types'
import { cn } from '../../utils/cn'
import { buttonClassName } from '../ui/Button'

interface LessonNavigationListProps {
  currentLessonSlug: string
  lessons: readonly Lesson[]
  onNavigate?: () => void
  topicSlug: string
}

interface LessonNavigationProps extends LessonNavigationListProps {
  topic: Topic
}

function LessonNavigationList({
  currentLessonSlug,
  lessons,
  onNavigate,
  topicSlug,
}: LessonNavigationListProps) {
  return (
    <ol className="mt-4 space-y-1">
      {lessons.map((lesson) => {
        const isCurrent = lesson.slug === currentLessonSlug

        return (
          <li key={lesson.id}>
            <Link
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'flex items-start gap-3 rounded-sm border-l-2 px-3 py-2 text-sm leading-5 transition-colors duration-150',
                isCurrent
                  ? 'border-l-accent bg-accent-soft font-semibold text-accent-strong'
                  : 'border-l-transparent text-ink-muted hover:bg-surface-alt hover:text-ink',
              )}
              onClick={onNavigate}
              to={'/learn/' + topicSlug + '/' + lesson.slug}
            >
              <span aria-hidden="true" className="shrink-0 text-xs font-semibold">
                {String(lesson.order).padStart(2, '0')}
              </span>
              <span>{lesson.title}</span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export function LessonSidebar({
  currentLessonSlug,
  lessons,
  topic,
  topicSlug,
}: LessonNavigationProps) {
  return (
    <aside aria-label="Current topic lessons" className="hidden lg:block">
      <div className="sticky top-[calc(var(--site-header-offset)+1rem)] max-h-[calc(100vh-var(--site-header-offset)-2rem)] overflow-y-auto border-r border-border pr-6">
        <Link className="type-label text-accent hover:underline" to="/learn">
          All topics
        </Link>
        <h2 className="mt-4 text-base font-semibold leading-6 text-ink">{topic.title}</h2>
        <Link className="mt-2 inline-block text-xs font-semibold text-ink-muted hover:text-accent hover:underline" to={'/learn/' + topicSlug}>
          View topic syllabus
        </Link>
        <nav aria-label={topic.title + ' lessons'}>
          <LessonNavigationList
            currentLessonSlug={currentLessonSlug}
            lessons={lessons}
            topicSlug={topicSlug}
          />
        </nav>
      </div>
    </aside>
  )
}

export function MobileLessonNavigation({
  currentLessonSlug,
  lessons,
  topic,
  topicSlug,
}: LessonNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const panelId = 'mobile-topic-lessons'

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <section className="lg:hidden">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className={buttonClassName({ variant: 'secondary', className: 'w-full !justify-between' })}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span>In this topic</span>
        <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          >
            <div className="mt-3 border-y border-border py-4">
              <p className="type-label text-ink-muted">{topic.title}</p>
              <nav aria-label={topic.title + ' lessons'}>
                <LessonNavigationList
                  currentLessonSlug={currentLessonSlug}
                  lessons={lessons}
                  onNavigate={() => setIsOpen(false)}
                  topicSlug={topicSlug}
                />
              </nav>
              <Link
                className="mt-5 inline-block text-sm font-semibold text-accent hover:underline"
                onClick={() => setIsOpen(false)}
                to={'/learn/' + topicSlug}
              >
                View topic syllabus
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
