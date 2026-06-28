import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import './index.module.css'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const GameDetailPage = lazy(() => import('./pages/GameDetailPage'))

// Loading fallback component
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#000000',
      color: '#6b5ca5',
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: '18px',
      fontWeight: '600'
    }}>
      Loading...
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        } />
        <Route path="/:category" element={
          <Suspense fallback={<LoadingFallback />}>
            <CategoryPage />
          </Suspense>
        } />
        <Route path="/:category/:subcategory" element={
          <Suspense fallback={<LoadingFallback />}>
            <CategoryPage />
          </Suspense>
        } />
        <Route path="/game/:gameId" element={
          <Suspense fallback={<LoadingFallback />}>
            <GameDetailPage />
          </Suspense>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  )
}