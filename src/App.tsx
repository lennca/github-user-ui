import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <div className='App bg-grey-8'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/user/:username' element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
