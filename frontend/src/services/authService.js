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
    const response = await api.get('/user/profile')
    // 如果返回的数据包含错误信息，说明未登录
    if (response.data && response.data.data && response.data.data.error) {
      return null
    }
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

// 创建博客文章
export const createBlogPost = async (blogPostData) => {
  try {
    const response = await api.post('/blog/posts', blogPostData)
    return response.data
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw error
  }
}

// 更新博客文章
export const updateBlogPost = async (id, blogPostData) => {
  try {
    const response = await api.put(`/blog/posts/${id}`, blogPostData)
    return response.data
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw error
  }
}

// 删除博客文章
export const deleteBlogPost = async (id) => {
  try {
    const response = await api.delete(`/blog/posts/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}

// 发布博客文章
export const publishBlogPost = async (id) => {
  try {
    const response = await api.put(`/blog/posts/${id}/publish`)
    return response.data
  } catch (error) {
    console.error('Error publishing blog post:', error)
    throw error
  }
}

export default api
