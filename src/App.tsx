import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Portfolio from './pages/Portfolio/Portfolio'
import Gem from './pages/Gem/Gem'
import Layout from './components/Layout/Layout'
import NotFound from './pages/NotFound/NotFound'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://finance-backend-hpew.onrender.com/health')
        .then((res) => res.text())
        .then((data) => console.log('Health check: ', data))
        .catch((err) => console.error('Error health check:', err))
    }, 14 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <BrowserRouter basename="/finance">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/gem" element={<Gem />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
