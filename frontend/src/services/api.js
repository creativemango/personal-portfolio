import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    const res = response.data
    
    // Check if it's a wrapped response from our backend
    if (res && typeof res === 'object' && 'status' in res) {
      if (res.status === 100) {
        // Success: return the inner data
        // If data is null/undefined but status is 100, return an empty object or the original res?
        // Usually returning res.data is correct.
        return res.data
      } else {
        // Business Logic Error (e.g. 101, 500 wrapped)
        const errorMessage = res.message || 'Unknown error'
        return Promise.reject(new Error(errorMessage))
      }
    }

    // Standard response or non-wrapped response
    return res
  },
  (error) => {
    // Handle HTTP errors (4xx, 5xx)
    const message = error.response?.data?.message || error.message || 'Network Error'
    console.error('API Error:', message)
    return Promise.reject(new Error(message))
  }
)

export default api
