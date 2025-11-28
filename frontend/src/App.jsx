import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogHome from './pages/BlogHome'
import About from './pages/About'
import Contact from './pages/Contact'
import CreatorCenter from './pages/CreatorCenter'
import { checkAuth } from './services/authService'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查用户是否已登录
    const checkUserAuth = async () => {
      try {
        // 首先检查localStorage中是否有用户信息
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            setUser(userData)
            setLoading(false)
            return
          } catch (e) {
            console.error('Error parsing stored user:', e)
            localStorage.removeItem('user')
          }
        }
        
        // 如果没有本地存储的用户信息，则调用API检查
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
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route 
            path="/home" 
            element={
              user ? <BlogHome user={user} /> : <Navigate to="/login" replace />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/creator-center" 
            element={
              user ? <CreatorCenter user={user} /> : <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
