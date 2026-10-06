export type LessonSectionKind =
  | 'text'
  | 'media'
  | 'theory'
  | 'gh5-setup'
  | 'tip'
  | 'warning'
  | 'exercise'
  | 'key-takeaways'

interface LessonSectionBase {
  id: string
}

export interface TextLessonSection extends LessonSectionBase {
  kind: 'text'
  paragraphs: readonly string[]
}

export interface MediaLessonSection extends LessonSectionBase {
  kind: 'media'
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'photo' | 'video' | 'square'
}

export interface TheoryLessonSection extends LessonSectionBase {
  kind: 'theory'
  title: string
  paragraphs: readonly string[]
}

export interface Gh5SetupSetting {
  label: string
  value: string
}

export interface Gh5SetupLessonSection extends LessonSectionBase {
  kind: 'gh5-setup'
  title: string
  settings?: readonly Gh5SetupSetting[]
  steps: readonly string[]
  note?: string
}

export interface TipLessonSection extends LessonSectionBase {
  kind: 'tip'
  content: string
}

export interface WarningLessonSection extends LessonSectionBase {
  kind: 'warning'
  content: string
}

export interface ExerciseLessonSection extends LessonSectionBase {
  kind: 'exercise'
  title: string
  instructions: string
  steps?: readonly string[]
  expectedObservation?: string
}

export interface KeyTakeawaysLessonSection extends LessonSectionBase {
  kind: 'key-takeaways'
  items: readonly string[]
}

export type LessonSection =
  | TextLessonSection
  | MediaLessonSection
  | TheoryLessonSection
  | Gh5SetupLessonSection
  | TipLessonSection
  | WarningLessonSection
  | ExerciseLessonSection
  | KeyTakeawaysLessonSection

export interface Lesson {
  id: string
  slug: string
  title: string
  summary?: string
  order: number
  estimatedMinutes?: number
  sections: readonly LessonSection[]
}

export interface Topic {
  id: string
  slug: string
  title: string
  description: string
  order: number
  lessons: readonly Lesson[]
}
