import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { getGitHubLoginUrl } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { Github, LogIn, User, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import FormInput from '../components/FormInput'

const Login = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  
  if (user) {
    return <Navigate to="/home" replace />
  }

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('local')

  const handleGitHubLogin = () => {
    window.location.href = getGitHubLoginUrl()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.username) newErrors.username = 'Username is required'
    if (!formData.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLocalLogin = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // login service now throws on error
      await login(formData.username, formData.password)
      navigate('/home', { replace: true })
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Log in to manage your blog and portfolio" 
      icon={LogIn}
    >
      <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded-xl flex transition-colors duration-300">
        <button
          onClick={() => setActiveTab('local')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'local' 
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('github')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'github' 
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          GitHub Login
        </button>
      </div>

      {activeTab === 'local' ? (
        <form className="mt-8 space-y-6" onSubmit={handleLocalLogin}>
          <div className="space-y-4">
            <FormInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              icon={User}
              error={errors.username}
              required
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              icon={Lock}
              error={errors.password}
              required
            />
          </div>

          {errors.submit && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-100 dark:border-red-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Login Failed</h3>
                  <div className="mt-1 text-sm text-red-700 dark:text-red-300">{errors.submit}</div>
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
              {isLoading ? 'Logging in...' : 'Login Now'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 transition-colors duration-300">
              <Github className="w-16 h-16 mx-auto text-gray-800 dark:text-gray-200 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">GitHub Authorization</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Login quickly with GitHub account, no registration required.
              </p>
            </div>

            <button
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#24292e] hover:bg-[#2f363d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
            
            <p className="text-xs text-gray-400 text-center px-4">
              You will be redirected to GitHub for authorization. We only request public profile access.
            </p>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}

export default Login
