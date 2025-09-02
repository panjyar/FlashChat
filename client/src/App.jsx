import { useState } from 'react'
import './App.css'
import { BrowserRouter as ReacRouterDom, Routes, Route } from 'react-router-dom'
import Auth from '@/pages/auth'
import Chat from '@/pages/chat'
import Profile from '@/pages/profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReacRouterDom>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </ReacRouterDom>
    </>
  )
}

export default App
