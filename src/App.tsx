import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import StartPage from './pages/StartPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <div className='App bg-github-bg'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/user/:username' element={<UserPage />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  )
}

export default App
