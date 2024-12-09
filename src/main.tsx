import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './component/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
