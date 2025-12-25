import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { checkAuth } from '../services/authService'

const OAuth2Success = () => {
  const { setUser } = useAuth()
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-colors duration-300">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            Processing Login...
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Handling your GitHub login, please wait...
          </p>
          <div className="flex justify-center items-center gap-3 text-gray-500 dark:text-gray-400">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 dark:border-purple-400"></div>
            <span>Processing</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OAuth2Success
