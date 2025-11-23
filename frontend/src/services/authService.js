import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // 允许发送cookie
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// 检查用户认证状态
export const checkAuth = async () => {
  try {
    const response = await api.get('/user/profile')
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      return null
    }
    throw error
  }
}

// 获取GitHub登录URL
export const getGitHubLoginUrl = () => {
  return 'http://localhost:8080/oauth2/authorization/github'
}

// 退出登录
export const logout = async () => {
  try {
    // 直接调用后端的退出端点
    await fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include', // 包含cookie
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // 清除前端状态
    window.location.href = '/'
  } catch (error) {
    console.error('Logout error:', error)
    // 即使API调用失败，也重定向到首页
    window.location.href = '/'
  }
}

// 获取博客文章
export const getBlogPosts = async () => {
  try {
    const response = await api.get('/blog/posts')
    return response.data
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

// 获取单个博客文章
export const getBlogPost = async (id) => {
  try {
    const response = await api.get(`/blog/posts/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
}

export default api
