import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { getGitHubLoginUrl, login } from '../services/authService'

const Login = ({ user, setUser }) => {
  const navigate = useNavigate()
  
  // 如果用户已经登录，重定向到博客主页
  if (user) {
    return <Navigate to="/home" replace />
  }

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('local') // 'local' 或 'github'

  const handleGitHubLogin = () => {
    // 重定向到GitHub OAuth2授权页面
    window.location.href = getGitHubLoginUrl()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username) {
      newErrors.username = '用户名不能为空'
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLocalLogin = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const result = await login(formData.username, formData.password)
      console.log('Login result:', result)
      
      // 解析响应数据结构
      const responseData = result.data
      if (responseData && responseData.success) {
        // 登录成功，更新用户状态
        setUser(responseData.user)
        // 存储用户信息到localStorage，确保页面刷新后仍保持登录状态
        localStorage.setItem('user', JSON.stringify(responseData.user))
        console.log('User stored in localStorage, navigating to /home')
        // 使用React Router导航，保持状态
        navigate('/home', { replace: true })
      } else {
        setErrors({ submit: responseData?.message || '登录失败' })
      }
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsLoading(false)
    }
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

            {/* 登录方式切换标签 */}
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #eee',
              marginBottom: '1.5rem'
            }}>
              <button
                onClick={() => setActiveTab('local')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: activeTab === 'local' ? '#667eea' : 'transparent',
                  color: activeTab === 'local' ? 'white' : '#666',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'local' ? '2px solid #667eea' : 'none'
                }}
              >
                用户名密码登录
              </button>
              <button
                onClick={() => setActiveTab('github')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: activeTab === 'github' ? '#667eea' : 'transparent',
                  color: activeTab === 'github' ? 'white' : '#666',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'github' ? '2px solid #667eea' : 'none'
                }}
              >
                GitHub 登录
              </button>
            </div>

            {/* 用户名密码登录表单 */}
            {activeTab === 'local' && (
              <form onSubmit={handleLocalLogin}>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    用户名
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input"
                    style={{ 
                      width: '100%',
                      border: errors.username ? '1px solid #e74c3c' : '1px solid #ddd'
                    }}
                    placeholder="请输入用户名"
                  />
                  {errors.username && (
                    <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      {errors.username}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    密码
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                    style={{ 
                      width: '100%',
                      border: errors.password ? '1px solid #e74c3c' : '1px solid #ddd'
                    }}
                    placeholder="请输入密码"
                  />
                  {errors.password && (
                    <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      {errors.password}
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.1rem',
                    backgroundColor: isLoading ? '#95a5a6' : '#667eea',
                    border: 'none',
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? '登录中...' : '登录'}
                </button>

                {errors.submit && (
                  <div style={{ 
                    color: '#e74c3c', 
                    fontSize: '0.9rem', 
                    marginTop: '1rem',
                    padding: '0.5rem',
                    backgroundColor: '#fdf2f2',
                    borderRadius: '5px'
                  }}>
                    {errors.submit}
                  </div>
                )}

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <p style={{ color: '#666', margin: 0 }}>
                    还没有账户？{' '}
                    <Link to="/register" style={{ color: '#667eea', textDecoration: 'none' }}>
                      立即注册
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {/* GitHub 登录 */}
            {activeTab === 'github' && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
