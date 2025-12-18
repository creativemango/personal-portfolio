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
    // 自动添加 JWT Token 到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.baseURL}${config.url}`)
    console.log('Full request config:', config)
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
    // 首先检查本地存储中是否有 token
    const token = localStorage.getItem('token')
    
    console.log('checkAuth called, token in localStorage:', token)

    // 使用全局拦截器自动添加 token（如果有的话）
    const response = await api.get('/user/profile')
    
    // 解析响应数据结构 - 兼容直接返回和包装返回
    const responseData = response.data
    const userData = (responseData.status === 100 && responseData.data) ? responseData.data : responseData
    
    console.log('checkAuth response data:', userData)
    
    // 如果返回的数据包含错误信息，说明未登录
    if (userData && userData.error) {
      console.log('User not logged in:', userData.error)
      // 清除无效的 token
      localStorage.removeItem('token')
      return null
    }
    
    // 如果返回了用户数据，说明已登录
    if (userData && (userData.login || userData.username)) {
      console.log('User data received:', userData)
      
      // 如果是 OAuth2 用户，确保存储用户信息
      if (userData.login && userData.id) {
        // OAuth2 用户，存储用户信息到 localStorage
        localStorage.setItem('user', JSON.stringify(userData))
        console.log('OAuth2 user info stored in localStorage')
      }
      
      return userData
    }
    
    console.log('No user data found')
    return null
  } catch (error) {
    console.error('checkAuth error:', error)
    if (error.response?.status === 401) {
      // 清除无效的 token
      localStorage.removeItem('token')
      return null
    }
    throw error
  }
}

// 获取GitHub登录URL
export const getGitHubLoginUrl = () => {
  return '/oauth2/authorization/github'
}

// 退出登录
export const logout = async () => {
  try {
    console.log('开始退出登录...');
    
    // 调用后端安全退出接口
    const response = await api.post('/logout');
    console.log('退出API响应:', response.data);
    
    // 清理本地存储
    localStorage.clear();
    sessionStorage.clear();
    console.log('本地存储已清除');
    
    // 强制刷新页面
    console.log('正在重定向到首页...');
    window.location.href = '/';
  } catch (error) {
    console.error('退出登录错误:', error);
    
    // 如果API调用失败，使用备用方案
    try {
      console.log('尝试备用退出方案...');
      await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
      });
      console.log('备用退出方案成功');
    } catch (e) {
      console.error('备用退出方案失败:', e);
    }
    
    // 清理本地存储
    localStorage.clear();
    sessionStorage.clear();
    console.log('本地存储已清除（备用方案）');
    
    // 强制刷新页面
    console.log('正在重定向到首页（备用方案）...');
    window.location.href = '/';
  }
}

// 用户注册
export const register = async (username, password, email) => {
  try {
    const response = await api.post('/register', {
      username,
      password,
      email: email || ''
    })
    return response.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

// 用户名密码登录
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', {
      username,
      password
    })
    
    console.log('Login response:', response.data)
    
    // 后端直接返回 LoginResponse 对象，没有嵌套的 data 字段
    const loginData = response.data.data
    
    // 如果登录成功，直接返回用户数据和token
    if (loginData && loginData.token) {
      // 存储 token
      localStorage.setItem('token', loginData.token)

      // 存储用户信息
      if (loginData.user) {
        localStorage.setItem('user', JSON.stringify(loginData.user))
      }
      
      // 返回登录数据
      return loginData
    }
    
    return loginData
  } catch (error) {
    console.error('Error logging in:', error)
    // 处理401错误，返回后端的具体错误信息
    if (error.response && error.response.status === 401) {
      // 如果后端返回了错误信息，使用后端的信息
      if (error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('用户名或密码错误')
    }
    // 处理400错误（参数错误）
    if (error.response && error.response.status === 400) {
      if (error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('请求参数错误')
    }
    // 处理其他错误
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('登录失败，请稍后重试')
  }
}

// 检查用户名是否可用
export const checkUsernameAvailability = async (username) => {
  try {
    const response = await api.get(`/check-username?username=${encodeURIComponent(username)}`)
    return response.data
  } catch (error) {
    console.error('Error checking username availability:', error)
    throw error
  }
}

// 检查邮箱是否可用
export const checkEmailAvailability = async (email) => {
  try {
    const response = await api.get(`/check-email?email=${encodeURIComponent(email)}`)
    return response.data
  } catch (error) {
    console.error('Error checking email availability:', error)
    throw error
  }
}

export default api
