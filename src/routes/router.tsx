import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../app/AppShell'
import { PageContainer } from '../components/layout/PageContainer'
import { LandingPage } from '../pages/LandingPage'
import { LearnPage } from '../pages/LearnPage'
import { LessonPage } from '../pages/LessonPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { TopicPage } from '../pages/TopicPage'

const routePlaceholders = {
  login: {
    title: 'Log in',
    description: 'Authentication is planned for a later phase.',
  },
  signup: {
    title: 'Sign up',
    description: 'Authentication is planned for a later phase.',
  },
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

export const router = createBrowserRouter([
  { path: '/', element: <LandingRoute /> },
  { path: '/learn', element: <LearnRoute /> },
  { path: '/learn/:topicSlug', element: <TopicRoute /> },
  { path: '/learn/:topicSlug/:lessonSlug', element: <LessonRoute /> },
  { path: '/login', element: <AppRoute page="login" /> },
  { path: '/signup', element: <AppRoute page="signup" /> },
  { path: '/dashboard', element: <AppRoute page="dashboard" /> },
  { path: '/profile', element: <AppRoute page="profile" /> },
  { path: '*', element: <NotFoundRoute /> },
])
