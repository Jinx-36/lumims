import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../app/AppShell'
import { PageContainer } from '../components/layout/PageContainer'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { LearnPage } from '../pages/LearnPage'
import { LessonPage } from '../pages/LessonPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { SignupPage } from '../pages/SignupPage'
import { TopicPage } from '../pages/TopicPage'

const routePlaceholders = {
  dashboard: {
    title: 'Dashboard',
    description: 'Learning progress will be available after Supabase integration.',
  },
  profile: {
    title: 'Profile',
    description: 'Account controls will be available after authentication is introduced.',
  },
} as const

function AppRoute({ page }: { page: keyof typeof routePlaceholders }) {
  const { title, description } = routePlaceholders[page]

  return (
    <AppShell>
      <PageContainer>
        <PlaceholderPage title={title} description={description} />
      </PageContainer>
    </AppShell>
  )
}

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

export const router = createBrowserRouter([
  { path: '/', element: <LandingRoute /> },
  { path: '/learn', element: <LearnRoute /> },
  { path: '/learn/:topicSlug', element: <TopicRoute /> },
  { path: '/learn/:topicSlug/:lessonSlug', element: <LessonRoute /> },
  { path: '/login', element: <LoginRoute /> },
  { path: '/signup', element: <SignupRoute /> },
  { path: '/dashboard', element: <AppRoute page="dashboard" /> },
  { path: '/profile', element: <AppRoute page="profile" /> },
  { path: '*', element: <NotFoundRoute /> },
])
