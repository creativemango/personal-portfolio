import api from './api'

// Check user authentication status
export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null

    // api.get returns the unwrapped data due to interceptor
    const userData = await api.get('/user/profile')
    
    if (userData && (userData.login || userData.username)) {
      if (userData.login && userData.id) {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      return userData
    }
    
    return null
  } catch (error) {
    console.error('checkAuth error:', error)
    localStorage.removeItem('token')
    return null
  }
}

export const getGitHubLoginUrl = () => {
  return '/oauth2/authorization/github'
}

export const logout = async () => {
  try {
    await api.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
  }
}

export const register = async (username, password, email) => {
  try {
    const data = await api.post('/register', {
      username,
      password,
      email: email || ''
    })
    return { success: true, user: data.user, token: data.token }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const login = async (username, password) => {
  try {
    const loginData = await api.post('/login', {
      username,
      password
    })
    
    if (loginData && loginData.token) {
      localStorage.setItem('token', loginData.token)
      if (loginData.user) {
        localStorage.setItem('user', JSON.stringify(loginData.user))
      }
      return loginData
    }
    return loginData
  } catch (error) {
    throw error
  }
}

export const checkUsernameAvailability = async (username) => {
  try {
    const data = await api.get(`/check-username?username=${encodeURIComponent(username)}`)
    return data
  } catch (error) {
    throw error
  }
}

export const checkEmailAvailability = async (email) => {
  try {
    const data = await api.get(`/check-email?email=${encodeURIComponent(email)}`)
    return data
  } catch (error) {
    throw error
  }
}

// Export api for backward compatibility if needed, though direct import is preferred
export default api
