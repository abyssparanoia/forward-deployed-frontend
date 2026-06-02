import { Routes, Route, Navigate } from 'react-router'
import { SignInPage } from './pages/sign-in'
import { AuthCallbackPage } from './pages/auth/callback'
import { AuthErrorPage } from './pages/auth/error'
import { DashboardPage } from './pages/dashboard'
import { SampleListPage } from './features/sample/pages/sample-list'
import { SampleDetailPage } from './features/sample/pages/sample-detail'
import { SampleFormPage } from './features/sample/pages/sample-form'
import { ProtectedRoute } from './components/protected-route'
import { AdminLayout } from './components/admin-layout'

export function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/auth/error" element={<AuthErrorPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="samples" element={<SampleListPage />} />
        <Route path="samples/new" element={<SampleFormPage />} />
        <Route path="samples/:id" element={<SampleDetailPage />} />
        <Route path="samples/:id/edit" element={<SampleFormPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
