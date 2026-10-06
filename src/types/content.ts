export type LessonSectionKind =
  | 'introduction'
  | 'theory'
  | 'gh5-configuration'
  | 'visual-example'
  | 'exercise'
  | 'key-takeaways'

export interface LessonSection {
  id: string
  title: string
  kind: LessonSectionKind
  content: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  summary: string
  order: number
  estimatedMinutes?: number
  sections: LessonSection[]
}

export interface Topic {
  id: string
  slug: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}
