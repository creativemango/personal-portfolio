import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const OAuth2Success = ({ setUser }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleOAuth2Success = () => {
      try {
        // 从 URL 参数中获取 token 和用户信息
        const token = searchParams.get('token')
        const userParam = searchParams.get('user')
        
        console.log('OAuth2 Success - Token:', token)
        console.log('OAuth2 Success - User param:', userParam)

        if (token && userParam) {
          try {
            // 解析用户信息
            const userInfo = JSON.parse(userParam)
            
            // 存储 token 和用户信息
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userInfo))
            
            // 更新 React 状态
            setUser(userInfo)
            
            console.log('OAuth2 login successful, redirecting to home')
            navigate('/home', { replace: true })
            return
          } catch (parseError) {
            console.error('Error parsing user info:', parseError)
          }
        }
        
        // 如果参数解析失败，尝试备用方案
        console.log('Falling back to API check...')
        checkAuthFallback()
        
      } catch (error) {
        console.error('OAuth2 login error:', error)
        navigate('/login', { replace: true })
      }
    }

    const checkAuthFallback = async () => {
      try {
        // 导入 checkAuth 函数
        const { checkAuth } = await import('../services/authService')
        const userData = await checkAuth()
        if (userData) {
          setUser(userData)
          navigate('/home', { replace: true })
        } else {
          navigate('/login', { replace: true })
        }
      } catch (error) {
        console.error('Fallback auth check failed:', error)
        navigate('/login', { replace: true })
      }
    }

    handleOAuth2Success()
  }, [navigate, setUser, searchParams])

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
              登录处理中...
            </h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              正在处理您的 GitHub 登录，请稍候...
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div className="spinner"></div>
              <span>处理中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OAuth2Success
