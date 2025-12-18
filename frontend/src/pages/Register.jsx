import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { checkUsernameAvailability } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const { user, setUser, register } = useAuth()
  const navigate = useNavigate()
  
  // 如果用户已经登录，重定向到博客主页
  if (user) {
    return <Navigate to="/home" replace />
  }

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [checkingUsername, setCheckingUsername] = useState(false)

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

    // 实时检查用户名可用性
    if (name === 'username') {
      if (value) {
        // 先验证用户名格式
        if (!/^[a-zA-Z0-9]+$/.test(value) || value.length > 50) {
          setUsernameAvailable(false)
          return
        }
        
        // 设置检查状态
        setCheckingUsername(true)
        
        // 调用后端接口检查用户名可用性
        checkUsernameAvailability(value)
          .then(result => {
            if (result.success) {
              setUsernameAvailable(result.available)
            } else {
              setUsernameAvailable(null)
            }
          })
          .catch(error => {
            console.error('检查用户名可用性失败:', error)
            setUsernameAvailable(null)
          })
          .finally(() => {
            setCheckingUsername(false)
          })
      } else {
        // 用户名为空时重置状态
        setUsernameAvailable(null)
        setCheckingUsername(false)
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // 用户名验证
    if (!formData.username) {
      newErrors.username = '用户名不能为空'
    } else if (formData.username.length > 50) {
      newErrors.username = '用户名不能超过50位'
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = '用户名只能包含字母和数字'
    } else if (usernameAvailable === false) {
      newErrors.username = '用户名已存在'
    }

    // 邮箱验证（可选）- 只验证格式，不检查是否已存在
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确'
    }

    // 密码验证
    if (!formData.password) {
      newErrors.password = '密码不能为空'
    } else if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = '密码长度必须为8-16位'
    }

    // 确认密码验证
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const result = await register(formData.username, formData.password, formData.email)
      console.log('Register result:', result)
      if (result.success) {
        // 注册成功，更新用户状态
        setUser(result.user)
        // 存储用户信息到localStorage，确保页面刷新后仍保持登录状态
        localStorage.setItem('user', JSON.stringify(result.user))
        console.log('User stored in localStorage, navigating to /home')
        // 使用React Router导航，保持状态
        navigate('/home', { replace: true })
      } else {
        setErrors({ submit: result.message })
      }
    } catch (error) {
      setErrors({ submit: error.message || '注册失败，请稍后重试' })
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
              注册新账户
            </h1>

            <form onSubmit={handleRegister}>
              {/* 用户名 */}
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  用户名 *
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
                  placeholder="请输入用户名（字母和数字，最多50位）"
                />
                {checkingUsername && (
                  <div style={{ 
                    color: '#667eea', 
                    fontSize: '0.8rem', 
                    marginTop: '0.25rem' 
                  }}>
                    检查用户名中...
                  </div>
                )}
                {!checkingUsername && usernameAvailable !== null && formData.username && (
                  <div style={{ 
                    color: usernameAvailable ? '#27ae60' : '#e74c3c', 
                    fontSize: '0.8rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {usernameAvailable ? '✓ 用户名可用' : '✗ 用户名已存在'}
                  </div>
                )}
                {errors.username && (
                  <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {errors.username}
                  </div>
                )}
              </div>

              {/* 邮箱 */}
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  邮箱
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  style={{ 
                    width: '100%',
                    border: errors.email ? '1px solid #e74c3c' : '1px solid #ddd'
                  }}
                  placeholder="请输入邮箱（可选）"
                />
                {errors.email && (
                  <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* 密码 */}
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  密码 *
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
                  placeholder="请输入密码（8-16位）"
                />
                {errors.password && (
                  <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* 确认密码 */}
              <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  确认密码 *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input"
                  style={{ 
                    width: '100%',
                    border: errors.confirmPassword ? '1px solid #e74c3c' : '1px solid #ddd'
                  }}
                  placeholder="请再次输入密码"
                />
                {errors.confirmPassword && (
                  <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {errors.confirmPassword}
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
                {isLoading ? '注册中...' : '注册'}
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
                  已有账户？{' '}
                  <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>
                    立即登录
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: '#f8f9fa', 
            borderRadius: '5px',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <p><strong>注册说明：</strong></p>
            <ul style={{ textAlign: 'left', marginTop: '0.5rem' }}>
              <li>用户名：50位以内的字母和数字组合</li>
              <li>密码：8-16位字符</li>
              <li>邮箱为可选字段，可用于找回密码</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
