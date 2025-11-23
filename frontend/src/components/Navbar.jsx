import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/authService'

const Navbar = ({ user, setUser }) => {
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // 立即清空用户状态
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
      window.location.href = '/';
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            个人作品集
          </Link>
        </div>
        
        <ul className="nav-links">
          <li>
            <Link to="/">首页</Link>
          </li>
          {user && (
            <li>
              <Link to="/home">博客</Link>
            </li>
          )}
          <li>
            <Link to="/about">关于</Link>
          </li>
          <li>
            <Link to="/contact">联系</Link>
          </li>
        </ul>

        <div className="user-info">
          {user ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <img 
                src={user.avatar_url} 
                alt="用户头像" 
                className="user-avatar"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/35x35/667eea/ffffff?text=U'
                }}
              />
              <span style={{ 
                color: 'white', 
                fontWeight: '500',
                fontSize: '0.95rem'
              }}>
                {user.login}
              </span>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                background: '#4CAF50', 
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <button 
                onClick={handleLogout}
                className="btn btn-danger"
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.4rem 0.8rem',
                  background: 'rgba(220, 53, 69, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                退出
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              登录
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
