import { Link } from 'react-router-dom'

import type { Topic } from '../../types'
import { cn } from '../../utils/cn'
import { Badge } from '../ui/Badge'
import { buttonClassName } from '../ui/Button'
import { Card } from '../ui/Card'

export interface TopicCardProps {
  topic: Topic
}

function formatTopicNumber(order: number) {
  return String(order).padStart(2, '0')
}

function getTopicDuration(topic: Topic) {
  return topic.lessons.reduce(
    (total, lesson) => total + (lesson.estimatedMinutes ?? 0),
    0,
  )
}

export function TopicCard({ topic }: TopicCardProps) {
  const lessonCount = topic.lessons.length
  const totalMinutes = getTopicDuration(topic)

  return (
    <li>
      <Card
        padding="none"
        className="group flex flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-2 motion-reduce:transform-none sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="accent">Topic {formatTopicNumber(topic.order)}</Badge>
          <p className="text-xs font-semibold tracking-[0.08em] text-ink-muted">
            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
            {totalMinutes > 0 ? ' · ' + totalMinutes + ' min' : ''}
          </p>
        </div>

        <h2 className="mt-7 font-display text-2xl leading-tight text-ink">
          {topic.title}
        </h2>
        <p className="mt-3 max-w-prose text-sm leading-6 text-ink-muted">
          {topic.description}
        </p>

        <Link
          className={cn(
            buttonClassName({ variant: 'text', size: 'small' }),
            'mt-7 self-start',
          )}
          to={'/learn/' + topic.slug}
        >
          Explore topic
        </Link>
      </Card>
    </li>
  )
}
