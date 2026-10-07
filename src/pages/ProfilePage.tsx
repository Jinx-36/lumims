import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth/AuthProvider'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { getSupabaseClient } from '../lib/supabase/client'

interface Profile {
  username: string | null
  avatar_url: string | null
}

export function ProfilePage() {
  const { clearLocalSession, user, signOut } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [isDeletePanelOpen, setIsDeletePanelOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!user) return

    let active = true
    setProfile(null)
    setUsername('')
    setStatus('loading')
    setMessage(null)
    setIsDeletePanelOpen(false)
    setDeleteConfirmation('')
    setDeleteError(null)

    void getSupabaseClient()
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        if (error || !data) {
          setStatus('error')
          setMessage('Your profile could not be loaded. Please try again later.')
          return
        }

        setProfile(data)
        setUsername(data.username ?? '')
        setStatus('ready')
      })

    return () => {
      active = false
    }
  }, [user])

  const initial = (profile?.username?.trim() || user?.email?.trim() || 'A').slice(0, 1).toUpperCase()

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) return

    setSaving(true)
    setMessage(null)
    const normalized = username.trim() || null

    try {
      const { data, error } = await getSupabaseClient()
        .from('profiles')
        .update({ username: normalized })
        .eq('id', user.id)
        .select('username, avatar_url')
        .single()

      if (error) {
        setMessage('Your profile could not be saved. Please try again.')
        return
      }

      setProfile(data)
      setUsername(data.username ?? '')
      setMessage('Profile updated.')
    } catch {
      setMessage('Your profile could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function logout() {
    setLoggingOut(true)
    setMessage(null)
    const { error } = await signOut()
    setLoggingOut(false)

    if (error) {
      setMessage('Could not log out. Please try again.')
      return
    }

    navigate('/', { replace: true })
  }

  async function deleteAccount() {
    setDeleteError(null)
    setIsDeleting(true)

    try {
      const { error } = await getSupabaseClient().functions.invoke('delete-account')
      if (error) {
        setDeleteError('Your account could not be deleted. Please try again.')
        return
      }

      await clearLocalSession()
      navigate('/', { replace: true })
    } catch {
      setDeleteError('Your account could not be deleted. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-320 px-5 py-12 sm:px-10 sm:py-16 lg:px-20">
      <header>
        <p className="type-label text-accent">Account</p>
        <h1 className="mt-4 type-h1">Profile</h1>
      </header>

      {status === 'loading' ? <div className="mt-8 h-48 max-w-xl animate-pulse rounded-md bg-surface-alt" aria-label="Loading profile" /> : null}
      {status === 'error' ? <p className="mt-8 text-accent" role="alert">{message}</p> : null}

      {status === 'ready' ? (
        <div className="mt-8 grid max-w-3xl gap-6">
          <Card>
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft font-display text-2xl text-accent-strong">
                {profile?.avatar_url ? <img alt="Profile avatar" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none' }} src={profile.avatar_url} /> : initial}
              </div>
              <div className="min-w-0">
                <h2 className="type-h2">{profile?.username || 'Your Lumims account'}</h2>
                <dl className="mt-2 text-sm">
                  <dt className="type-label text-muted">Email</dt>
                  <dd className="break-all text-foreground">{user?.email}</dd>
                </dl>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="type-h2">Profile details</h2>
            <form className="mt-6 max-w-md space-y-5" onSubmit={save}>
              <Input hint="Optional. It is only used for your personal Lumims account." label="Username" maxLength={80} onChange={(event) => setUsername(event.target.value)} value={username} />
              <Button disabled={saving} type="submit">{saving ? 'Saving…' : 'Save profile'}</Button>
              {message ? <p className={message === 'Profile updated.' ? 'text-sm text-muted' : 'text-sm text-accent'} role={message === 'Profile updated.' ? 'status' : 'alert'}>{message}</p> : null}
            </form>
          </Card>

          <section className="border-t border-border pt-6">
            <h2 className="type-h2">Account session</h2>
            <p className="mt-3 text-muted">Log out of this browser session.</p>
            <Button className="mt-5" disabled={loggingOut} onClick={() => void logout()} variant="secondary">
              {loggingOut ? 'Logging out…' : 'Log out'}
            </Button>
          </section>

          <section className="border-t border-border pt-6" aria-labelledby="delete-account-heading">
            <h2 className="type-h2" id="delete-account-heading">Delete account</h2>
            <p className="mt-3 max-w-xl text-muted">Permanently delete your Lumims account and saved learning progress. This signs you out and cannot be undone.</p>
            {!isDeletePanelOpen ? (
              <Button className="mt-5 border-accent text-accent hover:bg-accent-soft" onClick={() => setIsDeletePanelOpen(true)} variant="secondary">
                Delete account
              </Button>
            ) : (
              <div className="mt-5 max-w-xl border border-accent bg-accent-soft p-5">
                <p className="text-sm text-foreground">Type <strong>DELETE</strong> to permanently remove your account.</p>
                <Input className="bg-surface" disabled={isDeleting} label="Confirmation phrase" onChange={(event) => setDeleteConfirmation(event.target.value)} value={deleteConfirmation} />
                {deleteError ? <p className="mt-3 text-sm text-accent-strong" role="alert">{deleteError}</p> : null}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="inline-flex min-h-11 items-center justify-center rounded-pill bg-accent px-5 py-2.5 text-sm font-semibold text-warm-white transition-colors hover:bg-accent-strong disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60" disabled={deleteConfirmation !== 'DELETE' || isDeleting} onClick={() => void deleteAccount()} type="button">
                    {isDeleting ? 'Deleting account…' : 'Permanently delete account'}
                  </button>
                  <Button disabled={isDeleting} onClick={() => { setIsDeletePanelOpen(false); setDeleteConfirmation(''); setDeleteError(null) }} variant="secondary">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </main>
  )
}
