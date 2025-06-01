import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import TikTokLikeScreen from './pages/profiles/TikTokLikeScreen'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, RedirectIfAuthenticated } from './components/auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <RedirectIfAuthenticated>
              <LandingPage />
            </RedirectIfAuthenticated>
          } />
          <Route path="/login" element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          } />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/profiles" element={<TikTokLikeScreen />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
