import React, { useEffect, useState } from 'react'
import { getComments, deleteComment } from '../services/commentService'
import { useAuth } from '../context/AuthContext'
import { MessageSquare, Trash2 } from 'lucide-react'
import ConfirmDialog from './ConfirmDialog'
import UserAvatar from './UserAvatar'

const CommentList = ({ postId, refreshKey }) => {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null })

  const canDelete = (comment) => {
    if (!user) return false
    if (user.role === 'ADMIN') return true
    return user.id && comment.userId && String(user.id) === String(comment.userId)
  }

  const fetchComments = async () => {
    try {
      setLoading(true)
      const res = await getComments(postId, 1, 100)
      const items = (res && Array.isArray(res)) ? res : (res?.records || res?.items || [])
      setItems(items)
    } catch (e) {
      setError(e.message || 'Failed to load comments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (postId) {
      fetchComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, refreshKey])

  const handleDelete = async (id) => {
    setConfirmDelete({ open: true, id })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors duration-300">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
          <MessageSquare className="w-6 h-6" />
        </div>
        Comments
      </h3>
      {loading && <div className="text-gray-500 dark:text-gray-400">Loading comments...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && items.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No comments yet.</p>
        </div>
      )}
      <div className="space-y-8">
        {items.map((c) => (
          <div key={c.id} className="flex gap-4 items-start">
            <UserAvatar src={c.avatarUrl} name={c.authorName} size="md" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900 dark:text-white">{c.authorName || 'Anonymous'}</div>
                {canDelete(c) && (
                  <button
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(c.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                {c.content}
              </div>
              {c.createdAt && (
                <div className="text-xs text-gray-400 mt-2">
                  {formatDate(c.createdAt)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog
        open={confirmDelete.open}
        title="确认删除"
        message="确定要删除该评论吗？此操作不可恢复"
        confirmText="删除"
        cancelText="取消"
        onConfirm={async () => {
          try {
            if (!confirmDelete.id) return
            await deleteComment(confirmDelete.id)
            setItems(prev => prev.filter(i => i.id !== confirmDelete.id))
          } catch (e) {
            alert(e.message || 'Delete failed')
          } finally {
            setConfirmDelete({ open: false, id: null })
          }
        }}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
      />
    </div>
  )
}

export default CommentList

function formatDate(v) {
  if (!v) return ''
  if (typeof v === 'number') {
    const d = new Date(v)
    return isNaN(d.getTime()) ? String(v) : d.toLocaleString()
  }
  if (typeof v === 'string') {
    if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(v)) {
      return v
    }
    const d = new Date(v)
    return isNaN(d.getTime()) ? v : d.toLocaleString()
  }
  const d = new Date(v)
  return isNaN(d.getTime()) ? String(v) : d.toLocaleString()
}
