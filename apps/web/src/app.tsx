import { Routes, Route, Navigate } from 'react-router'
import { SignInPage } from './pages/sign-in'
import { TopPage } from './pages/top'
import { MyPage } from './pages/my-page'
import { AuthCallbackPage } from './pages/auth/callback'
import { AuthErrorPage } from './pages/auth/error'
import { ProtectedRoute } from './components/protected-route'
import { WebLayout } from './components/web-layout'

export function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/auth/error" element={<AuthErrorPage />} />
      <Route path="/" element={<WebLayout />}>
        <Route index element={<TopPage />} />
        <Route
          path="mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
