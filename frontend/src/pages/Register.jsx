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
          setUsernameMessage('Username must contain only letters and numbers, max 50 chars')
          return
        }
        
        setUsernameStatus('loading')
        setUsernameMessage('')
        
        checkUsernameAvailability(value)
          .then(result => {
            const isAvailable = result && typeof result === 'object' ? result.available : result
            
            if (isAvailable) {
              setUsernameStatus('success')
              setUsernameMessage('Username available')
            } else {
              setUsernameStatus('error')
              setUsernameMessage('Username already exists')
            }
          })
          .catch(error => {
            console.error('Failed to check username availability:', error)
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
      newErrors.username = 'Username is required'
    } else if (usernameStatus === 'error' && !usernameMessage.includes('contain only')) {
      newErrors.username = 'Username already exists'
    } else if (usernameStatus === 'error') {
       newErrors.username = usernameMessage
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = 'Password must be 8-16 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      setErrors({ submit: error.message || 'Registration failed, please try again later' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create New Account"
      subtitle="Join us and start your creative journey"
      icon={UserPlus}
    >
      <form className="mt-8 space-y-6" onSubmit={handleRegister}>
        <div className="space-y-4">
          <FormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Letters and numbers, max 50 chars"
            icon={User}
            error={errors.username}
            required
            status={usernameStatus}
            statusMessage={usernameMessage}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Optional, used for password recovery"
            icon={Mail}
            error={errors.email}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="8-16 characters"
            icon={Lock}
            error={errors.password}
            required
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Please enter password again"
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
                <h3 className="text-sm font-medium text-red-800">Registration Failed</h3>
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
            {isLoading ? 'Registering...' : 'Register Now'}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Login Now
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Register
