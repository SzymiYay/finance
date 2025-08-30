import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Portfolio from './pages/Portfolio/Portfolio'
import Gem from './pages/Gem/Gem'
import Layout from './components/Layout/Layout'

function App() {
  return (
    <>
      <BrowserRouter basename="/finance">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/gem" element={<Gem />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
