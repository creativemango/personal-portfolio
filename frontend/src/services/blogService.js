import api from './authService.js'

/**
 * 博客文章API服务 - 使用axios实例（自动携带JWT token）
 */
const API_BASE_PATH = '/blog/posts';

/**
 * 分页获取所有博客文章
 * @param {number} page - 页码，从1开始
 * @param {number} size - 每页条数
 * @param {string} keyword - 搜索关键词（可选）
 * @returns {Promise} 分页结果
 */
export const getBlogPosts = async (page = 1, size = 10, keyword = '') => {
  try {
    const params = {
      page,
      size,
      ...(keyword && { keyword })
    };
    
    const response = await api.get(API_BASE_PATH, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * 分页获取已发布的博客文章
 * @param {number} page - 页码，从1开始
 * @param {number} size - 每页条数
 * @param {string} keyword - 搜索关键词（可选）
 * @returns {Promise} 分页结果
 */
export const getPublishedBlogPosts = async (page = 1, size = 10, keyword = '') => {
  try {
    const params = {
      page,
      size,
      ...(keyword && { keyword })
    };
    
    const response = await api.get(`${API_BASE_PATH}/published`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching published blog posts:', error);
    throw error;
  }
};

/**
 * 获取单个博客文章详情
 * @param {number} id - 文章ID
 * @returns {Promise} 文章详情
 */
export const getBlogPostById = async (id) => {
  try {
    const response = await api.get(`${API_BASE_PATH}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

/**
 * 创建博客文章
 * @param {Object} postData - 文章数据
 * @returns {Promise} 创建后的文章
 */
export const createBlogPost = async (postData) => {
  try {
    const response = await api.post(API_BASE_PATH, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

/**
 * 更新博客文章
 * @param {number} id - 文章ID
 * @param {Object} postData - 文章数据
 * @returns {Promise} 更新后的文章
 */
export const updateBlogPost = async (id, postData) => {
  try {
    const response = await api.put(`${API_BASE_PATH}/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

/**
 * 发布博客文章
 * @param {number} id - 文章ID
 * @returns {Promise} 发布后的文章
 */
export const publishBlogPost = async (id) => {
  try {
    const response = await api.put(`${API_BASE_PATH}/${id}/publish`);
    return response.data;
  } catch (error) {
    console.error('Error publishing blog post:', error);
    throw error;
  }
};

/**
 * 删除博客文章
 * @param {number} id - 文章ID
 * @returns {Promise} 删除结果
 */
export const deleteBlogPost = async (id) => {
  try {
    const response = await api.delete(`${API_BASE_PATH}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};
