import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { curriculum, getNextLesson, type CurriculumLesson } from '../../content/curriculum'
import { getSupabaseClient } from '../../lib/supabase/client'
import type { Database } from '../../types/database'

type ProgressRow = Pick<Database['public']['Tables']['lesson_progress']['Row'], 'lesson_id' | 'completed' | 'completed_at' | 'last_visited_at'>
interface ProgressSummary { completedLessons: number; totalLessons: number; percentage: number }
interface ProgressContextValue {
  status: 'idle' | 'loading' | 'ready' | 'error'
  error: string | null
  isLessonCompleted: (lessonId: string) => boolean
  getTopicProgress: (lessonIds: readonly string[]) => ProgressSummary
  overallProgress: ProgressSummary
  continueLearning: CurriculumLesson | null
  setLessonCompleted: (lessonId: string, completed: boolean) => Promise<void>
  recordLessonVisit: (lessonId: string) => Promise<void>
}
const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)
const allLessons = curriculum.flatMap((topic) => topic.lessons.map((lesson) => ({ topic, lesson })))
const lessonIds = new Set(allLessons.map(({ lesson }) => lesson.id))

export function ProgressProvider({ children }: PropsWithChildren) {
  const { status: authStatus, user } = useAuth()
  const [rows, setRows] = useState<Record<string, ProgressRow>>({})
  const [status, setStatus] = useState<ProgressContextValue['status']>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setRows({}); setError(null)
    if (authStatus !== 'authenticated' || !user) { setStatus('idle'); return }
    let active = true
    setStatus('loading')
    void getSupabaseClient().from('lesson_progress').select('lesson_id, completed, completed_at, last_visited_at').eq('user_id', user.id).then(({ data, error: loadError }) => {
      if (!active) return
      if (loadError) { setStatus('error'); setError('Your progress could not be loaded. You can still keep learning.'); return }
      setRows(Object.fromEntries((data ?? []).map((row) => [row.lesson_id, row])))
      setStatus('ready')
    })
    return () => { active = false }
  }, [authStatus, user])

  const isLessonCompleted = useCallback((lessonId: string) => rows[lessonId]?.completed === true, [rows])
  const getTopicProgress = useCallback((ids: readonly string[]): ProgressSummary => {
    const canonical = ids.filter((id) => lessonIds.has(id))
    const completedLessons = new Set(canonical.filter((id) => rows[id]?.completed)).size
    return { completedLessons, totalLessons: canonical.length, percentage: canonical.length ? Math.round((completedLessons / canonical.length) * 100) : 0 }
  }, [rows])
  const overallProgress = useMemo(() => getTopicProgress([...lessonIds]), [getTopicProgress])
  const continueLearning = useMemo(() => {
    const known = Object.values(rows).filter((row) => lessonIds.has(row.lesson_id))
    if (!known.length) return null
    const recent = known.filter((row) => row.last_visited_at).sort((a, b) => (b.last_visited_at ?? '').localeCompare(a.last_visited_at ?? ''))[0]
    const current = recent ? allLessons.find(({ lesson }) => lesson.id === recent.lesson_id) : undefined
    if (current && !recent?.completed) return current
    if (current?.lesson && recent?.completed) return getNextLesson(current.topic.slug, current.lesson.slug) ?? allLessons.find(({ lesson }) => !rows[lesson.id]?.completed) ?? null
    return allLessons.find(({ lesson }) => !rows[lesson.id]?.completed) ?? null
  }, [rows])

  const persist = useCallback(async (lessonId: string, patch: Partial<ProgressRow>) => {
    if (!user) return
    const previous = rows[lessonId]
    const optimistic: ProgressRow = { lesson_id: lessonId, completed: previous?.completed ?? false, completed_at: previous?.completed_at ?? null, last_visited_at: previous?.last_visited_at ?? null, ...patch }
    setRows((current) => ({ ...current, [lessonId]: optimistic }))
    const { data, error: mutationError } = await getSupabaseClient().from('lesson_progress').upsert({ user_id: user.id, ...patch, lesson_id: lessonId }, { onConflict: 'user_id,lesson_id' }).select('lesson_id, completed, completed_at, last_visited_at').single()
    if (mutationError) { setRows((current) => { const next = { ...current }; if (previous) next[lessonId] = previous; else delete next[lessonId]; return next }); setError('Your progress could not be saved. Please try again.'); throw mutationError }
    setRows((current) => ({ ...current, [lessonId]: data }))
  }, [rows, user])
  const setLessonCompleted = useCallback(async (lessonId: string, completed: boolean) => {
    if (rows[lessonId]?.completed === completed) return
    await persist(lessonId, { completed, completed_at: completed ? new Date().toISOString() : null })
  }, [persist, rows])
  const recordLessonVisit = useCallback(async (lessonId: string) => { await persist(lessonId, { last_visited_at: new Date().toISOString() }) }, [persist])
  const value = useMemo(() => ({ status, error, isLessonCompleted, getTopicProgress, overallProgress, continueLearning, setLessonCompleted, recordLessonVisit }), [status, error, isLessonCompleted, getTopicProgress, overallProgress, continueLearning, setLessonCompleted, recordLessonVisit])
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
export function useProgress() { const value = useContext(ProgressContext); if (!value) throw new Error('useProgress must be used within a ProgressProvider.'); return value }
