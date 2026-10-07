import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuth } from '../components/auth/AuthProvider'
import { DashboardPage } from '../pages/DashboardPage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage'
import { ProfilePage } from '../pages/ProfilePage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { AppShell } from '../app/AppShell'
import { PageContainer } from '../components/layout/PageContainer'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { LearnPage } from '../pages/LearnPage'
import { LessonPage } from '../pages/LessonPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SignupPage } from '../pages/SignupPage'
import { TopicPage } from '../pages/TopicPage'

function LandingRoute() {
  return (
    <AppShell>
      <LandingPage />
    </AppShell>
  )
}

function LearnRoute() {
  return (
    <AppShell>
      <LearnPage />
    </AppShell>
  )
}

function TopicRoute() {
  return (
    <AppShell>
      <TopicPage />
    </AppShell>
  )
}

function LessonRoute() {
  return (
    <AppShell>
      <LessonPage />
    </AppShell>
  )
}

function NotFoundRoute() {
  return (
    <AppShell>
      <PageContainer>
        <NotFoundPage />
      </PageContainer>
    </AppShell>
  )
}

function LoginRoute() {
  return <AppShell><LoginPage /></AppShell>
}

function SignupRoute() {
  return <AppShell><SignupPage /></AppShell>
}
function ForgotPasswordRoute() {
  return <AppShell><ForgotPasswordPage /></AppShell>
}
function ResetPasswordRoute() {
  return <AppShell><ResetPasswordPage /></AppShell>
}
function DashboardRoute() { const { status } = useAuth(); if (status === 'loading') return <AppShell><PageContainer><p className="text-muted">Loading your dashboard…</p></PageContainer></AppShell>; if (status !== 'authenticated') return <Navigate replace to="/login" />; return <AppShell><DashboardPage /></AppShell> }
function ProfileRoute() { const { status } = useAuth(); if (status === 'loading') return <AppShell><PageContainer><p className="text-muted">Loading your profile…</p></PageContainer></AppShell>; if (status !== 'authenticated') return <Navigate replace to="/login" />; return <AppShell><ProfilePage /></AppShell> }

export const router = createBrowserRouter([
  { path: '/', element: <LandingRoute /> },
  { path: '/learn', element: <LearnRoute /> },
  { path: '/learn/:topicSlug', element: <TopicRoute /> },
  { path: '/learn/:topicSlug/:lessonSlug', element: <LessonRoute /> },
  { path: '/login', element: <LoginRoute /> },
  { path: '/signup', element: <SignupRoute /> },
  { path: '/forgot-password', element: <ForgotPasswordRoute /> },
  { path: '/reset-password', element: <ResetPasswordRoute /> },
  { path: '/dashboard', element: <DashboardRoute /> },
  { path: '/profile', element: <ProfileRoute /> },
  { path: '*', element: <NotFoundRoute /> },
])
