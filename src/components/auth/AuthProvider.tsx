import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSupabaseClient } from '../../lib/supabase/client'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface AuthContextValue {
  clearLocalSession: () => Promise<{ error: Error | null }>
  requestPasswordReset: (email: string) => Promise<{ error: Error | null }>
  session: Session | null
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null; session: Session | null }>
  status: AuthStatus
  updatePassword: (password: string) => Promise<{ error: Error | null }>
  user: User | null
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function statusForSession(session: Session | null): AuthStatus {
  return session ? 'authenticated' : 'unauthenticated'
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    const supabase = getSupabaseClient()
    let isMounted = true

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession)
        setStatus(statusForSession(nextSession))
      }
    })

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) {
        return
      }

      setSession(error ? null : data.session)
      setStatus(statusForSession(error ? null : data.session))
    }).catch(() => {
      if (isMounted) {
        setSession(null)
        setStatus('unauthenticated')
      }
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password })
    return { error }
  }, [])
  const signInWithGoogle = useCallback(async () => {
    const { error } = await getSupabaseClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    return { error }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await getSupabaseClient().auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    })

    return { error, session: data.session }
  }, [])

  const requestPasswordReset = useCallback(async (email: string) => {
    const { error } = await getSupabaseClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    return { error }
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    const { error } = await getSupabaseClient().auth.updateUser({ password })
    return { error }
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await getSupabaseClient().auth.signOut()
    if (!error) {
      setSession(null)
      setStatus('unauthenticated')
    }
    return { error }
  }, [])

  const clearLocalSession = useCallback(async () => {
    const { error } = await getSupabaseClient().auth.signOut({ scope: 'local' })
    setSession(null)
    setStatus('unauthenticated')
    return { error }
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    clearLocalSession,
    requestPasswordReset,
    session,
    signIn,
    signInWithGoogle,
    signOut,
    signUp,
    status,
    updatePassword,
    user: session?.user ?? null,
  }), [clearLocalSession, requestPasswordReset, session, signIn, signInWithGoogle, signOut, signUp, status, updatePassword])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}
