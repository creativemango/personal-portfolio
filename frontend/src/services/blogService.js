import api from './api';

/**
 * Blog Post API Service
 */
const API_BASE_PATH = '/blog/posts';

/**
 * Get blog posts with pagination
 */
export const getBlogPosts = async (page = 1, size = 10, keyword = '', status = '') => {
  const params = {
    page,
    size,
    ...(keyword && { keyword }),
    ...(status && { status })
  };
  
  // Interceptor returns the unwrapped data
  return await api.get(API_BASE_PATH, { params });
};

/**
 * Get published blog posts
 */
export const getPublishedBlogPosts = async (page = 1, size = 10, keyword = '') => {
  const params = {
    page,
    size,
    ...(keyword && { keyword })
  };
  
  return await api.get(`${API_BASE_PATH}/published`, { params });
};

/**
 * Get single blog post
 */
export const getBlogPostById = async (id) => {
  return await api.get(`${API_BASE_PATH}/${id}`);
};

/**
 * Create blog post
 */
export const createBlogPost = async (postData) => {
  return await api.post(API_BASE_PATH, postData);
};

/**
 * Update blog post
 */
export const updateBlogPost = async (id, postData) => {
  return await api.put(`${API_BASE_PATH}/${id}`, postData);
};

/**
 * Publish blog post
 */
export const publishBlogPost = async (id) => {
  return await api.put(`${API_BASE_PATH}/${id}/publish`);
};

/**
 * Delete blog post
 */
export const deleteBlogPost = async (id) => {
  return await api.delete(`${API_BASE_PATH}/${id}`);
};

/**
 * Upload blog post cover image
 */
export const uploadCover = async (id, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return await api.post(`${API_BASE_PATH}/${id}/cover`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
