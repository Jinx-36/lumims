export interface LessonProgress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  completedAt: string | null
  lastVisitedAt: string
}

export interface TopicProgress {
  topicId: string
  completedLessons: number
  totalLessons: number
}
