import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthProvider'
import { ProgressProvider } from './components/learning/ProgressProvider'
import { router } from './routes/router'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider><RouterProvider router={router} /></ProgressProvider>
    </AuthProvider>
  </StrictMode>,
)
