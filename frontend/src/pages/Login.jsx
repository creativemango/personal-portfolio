import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getGitHubLoginUrl } from '../services/authService'

const Login = ({ user, setUser }) => {
  // 如果用户已经登录，重定向到博客主页
  if (user) {
    return <Navigate to="/home" replace />
  }

  const handleGitHubLogin = () => {
    // 重定向到GitHub OAuth2授权页面
    window.location.href = 'http://localhost:8080/oauth2/authorization/github'
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ 
          maxWidth: '400px', 
          margin: '2rem auto', 
          textAlign: 'center' 
        }}>
          <div className="card">
            <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>
              登录到个人作品集
            </h1>
            
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              使用您的GitHub账户登录
            </p>

            <button 
              onClick={handleGitHubLogin}
              className="btn"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#24292e',
                border: 'none'
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="white"
                style={{ flexShrink: 0 }}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              使用 GitHub 登录
            </button>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              background: '#f8f9fa', 
              borderRadius: '5px',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              <p>登录后，您将能够：</p>
              <ul style={{ textAlign: 'left', marginTop: '0.5rem' }}>
                <li>访问个人博客主页</li>
                <li>查看和管理博客文章</li>
                <li>查看您的GitHub信息</li>
              </ul>
            </div>
          </div>

          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: '#e7f3ff', 
            borderRadius: '5px',
            border: '1px solid #b3d9ff',
            fontSize: '0.9rem',
            color: '#0066cc'
          }}>
            <p>
              <strong>注意：</strong> 您将被重定向到GitHub进行授权。
              我们只会获取您的基本信息和公开仓库信息。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
