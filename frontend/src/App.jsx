import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogHome from './pages/BlogHome'
import About from './pages/About'
import Contact from './pages/Contact'
import CreatorCenter from './pages/CreatorCenter'
import OAuth2Success from './pages/OAuth2Success'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading">
        <h2>加载中...</h2>
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/home" 
            element={
              user ? <BlogHome /> : <Navigate to="/login" replace />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/creator-center" 
            element={
              user ? <CreatorCenter /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/oauth2/success" 
            element={<OAuth2Success />} 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
