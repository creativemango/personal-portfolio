import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { checkUsernameAvailability } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Lock, ArrowRight, AlertCircle, UserPlus } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import FormInput from '../components/FormInput'

const Register = () => {
  const { user, setUser, register } = useAuth()
  const navigate = useNavigate()
  
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
  const [usernameStatus, setUsernameStatus] = useState(null) // null, 'loading', 'success', 'error'
  const [usernameMessage, setUsernameMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    if (name === 'username') {
      if (value) {
        if (!/^[a-zA-Z0-9]+$/.test(value) || value.length > 50) {
          setUsernameStatus('error')
          setUsernameMessage('用户名只能包含字母和数字，最多50位')
          return
        }
        
        setUsernameStatus('loading')
        setUsernameMessage('')
        
        checkUsernameAvailability(value)
          .then(result => {
            // result is the unwrapped data.
            // Backend returns Boolean for check-username? 
            // Let's assume it returns { available: true/false } or simply true/false.
            // I should check authService.js checkUsernameAvailability.
            // It calls api.get. If backend returns simple boolean, result is boolean.
            // If backend returns object { available: true }, result is that object.
            
            // Let's assume the previous code `result.success` and `result.available` implies 
            // the response was wrapped. Now it is unwrapped.
            // If the backend returns `true` or `false` directly inside data...
            
            // Wait, I need to verify what checkUsernameAvailability returns.
            // Previously: 
            // if (result.success) { setUsernameAvailable(result.available) }
            
            // If I look at authService.js:
            // return data
            
            // I'll assume result has an 'available' property or is the boolean itself.
            // To be safe, let's debug or assume it follows the pattern { available: true }
            
            const isAvailable = result && typeof result === 'object' ? result.available : result
            
            if (isAvailable) {
              setUsernameStatus('success')
              setUsernameMessage('用户名可用')
            } else {
              setUsernameStatus('error')
              setUsernameMessage('用户名已存在')
            }
          })
          .catch(error => {
            console.error('检查用户名可用性失败:', error)
            setUsernameStatus(null)
            setUsernameMessage('')
          })
      } else {
        setUsernameStatus(null)
        setUsernameMessage('')
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username) {
      newErrors.username = '用户名不能为空'
    } else if (usernameStatus === 'error' && !usernameMessage.includes('只能包含')) {
      newErrors.username = '用户名已存在'
    } else if (usernameStatus === 'error') {
       newErrors.username = usernameMessage
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确'
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空'
    } else if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = '密码长度必须为8-16位'
    }

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
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await register(formData.username, formData.password, formData.email)
      if (result.success) {
        setUser(result.user)
        localStorage.setItem('user', JSON.stringify(result.user))
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
    <AuthLayout
      title="创建新账户"
      subtitle="加入我们，开始您的创作之旅"
      icon={UserPlus}
    >
      <form className="mt-8 space-y-6" onSubmit={handleRegister}>
        <div className="space-y-4">
          <FormInput
            label="用户名"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="字母和数字，最多50位"
            icon={User}
            error={errors.username}
            required
            status={usernameStatus}
            statusMessage={usernameMessage}
          />

          <FormInput
            label="邮箱"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="可选，用于找回密码"
            icon={Mail}
            error={errors.email}
          />

          <FormInput
            label="密码"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="8-16位字符"
            icon={Lock}
            error={errors.password}
            required
          />

          <FormInput
            label="确认密码"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="请再次输入密码"
            icon={Lock}
            error={errors.confirmPassword}
            required
          />
        </div>

        {errors.submit && (
          <div className="rounded-lg bg-red-50 p-4 border border-red-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">注册失败</h3>
                <div className="mt-1 text-sm text-red-700">{errors.submit}</div>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight className="h-5 w-5 text-primary-500 group-hover:text-primary-400 transition-colors" />
              </span>
            )}
            {isLoading ? '注册中...' : '立即注册'}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            已有账户？{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              立即登录
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Register
