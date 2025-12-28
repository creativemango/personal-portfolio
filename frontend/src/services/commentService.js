import api from './api'

const API_BASE_PATH = '/blog/posts'

export const getComments = async (postId, page = 1, size = 20) => {
  const params = { page, size }
  return await api.get(`${API_BASE_PATH}/${postId}/comments`, { params })
}

export const createComment = async (postId, content, parentId = null) => {
  return await api.post(`${API_BASE_PATH}/${postId}/comments`, { content, parentId })
}

export const deleteComment = async (commentId) => {
  return await api.delete(`/comments/${commentId}`)
}

