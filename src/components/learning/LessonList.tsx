import { Link } from 'react-router-dom'

import type { Lesson } from '../../types'
import { Badge } from '../ui/Badge'

export type LessonCompletionStatus = 'incomplete' | 'complete'

export interface LessonListItemProps {
  lesson: Lesson
  topicSlug: string
  completionStatus?: LessonCompletionStatus
}

export interface LessonListProps {
  lessons: readonly Lesson[]
  topicSlug: string
  completionByLessonId?: Readonly<Record<string, LessonCompletionStatus>>
}

function formatLessonNumber(order: number) {
  return String(order).padStart(2, '0')
}

export function LessonListItem({
  lesson,
  topicSlug,
  completionStatus,
}: LessonListItemProps) {
  return (
    <li className="border-b border-border first:border-t">
      <Link
        className="group flex min-h-20 items-center gap-4 py-4 transition-colors duration-150 hover:text-accent sm:gap-6 sm:px-2"
        to={'/learn/' + topicSlug + '/' + lesson.slug}
      >
        <span
          aria-hidden="true"
          className="w-7 shrink-0 text-xs font-semibold tracking-[0.08em] text-ink-muted"
        >
          {formatLessonNumber(lesson.order)}
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-6 text-ink group-hover:text-accent sm:text-base">
          {lesson.title}
        </span>
        <span className="shrink-0 text-xs font-semibold tracking-[0.08em] text-ink-muted">
          {lesson.estimatedMinutes ? lesson.estimatedMinutes + ' min' : '—'}
        </span>
        {completionStatus === 'complete' ? (
          <>
            <span className="sr-only">Completed</span>
            <Badge className="hidden sm:inline-flex">Completed</Badge>
          </>
        ) : null}
      </Link>
    </li>
  )
}

export function LessonList({
  lessons,
  topicSlug,
  completionByLessonId,
}: LessonListProps) {
  return (
    <ol aria-label="Lessons" className="mt-8">
      {lessons.map((lesson) => (
        <LessonListItem
          key={lesson.id}
          lesson={lesson}
          topicSlug={topicSlug}
          completionStatus={completionByLessonId?.[lesson.id]}
        />
      ))}
    </ol>
  )
}
