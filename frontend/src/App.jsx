import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import BlogHome from './pages/BlogHome'
import About from './pages/About'
import Contact from './pages/Contact'
import { checkAuth } from './services/authService'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查用户是否已登录
    const checkUserAuth = async () => {
      try {
        const userData = await checkAuth()
        setUser(userData)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkUserAuth()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <h2>加载中...</h2>
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route 
            path="/home" 
            element={
              user ? <BlogHome user={user} /> : <Navigate to="/login" replace />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
