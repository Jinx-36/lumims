import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../app/AppShell'
import { PageContainer } from '../components/layout/PageContainer'
import { LandingPage } from '../pages/LandingPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'

const routePlaceholders = {
  learn: {
    title: 'Learn',
    description: 'The curriculum overview will be introduced in a later phase.',
  },
  topic: {
    title: 'Topic',
    description: 'Topic lessons will be connected to the curriculum data layer in a later phase.',
  },
  lesson: {
    title: 'Lesson',
    description: 'Lesson content will be introduced after the learning framework is in place.',
  },
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
  { path: '/learn', element: <AppRoute page="learn" /> },
  { path: '/learn/:topicSlug', element: <AppRoute page="topic" /> },
  { path: '/learn/:topicSlug/:lessonSlug', element: <AppRoute page="lesson" /> },
  { path: '/login', element: <AppRoute page="login" /> },
  { path: '/signup', element: <AppRoute page="signup" /> },
  { path: '/dashboard', element: <AppRoute page="dashboard" /> },
  { path: '/profile', element: <AppRoute page="profile" /> },
  { path: '*', element: <NotFoundRoute /> },
])
