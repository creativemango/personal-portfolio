import api from './api'

export const notificationService = {
  getUnreadCount: () => {
    return api.get('/notifications/unread-count')
  },

  listNotifications: (page = 1, size = 10) => {
    return api.get('/notifications', {
      params: { page, size }
    })
  },

  markAsRead: (id) => {
    return api.put(`/notifications/${id}/read`)
  },

  markAllAsRead: () => {
    return api.put('/notifications/read-all')
  }
}
