import React, { useState } from 'react'
import { createComment } from '../services/commentService'
import { MessageSquare, X } from 'lucide-react'

const CommentForm = ({ postId, enabled, onPosted, parentId = null, onCancel }) => {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    const text = content.trim()
    if (!text) return
    if (text.length > 1000) {
      alert('Comment is too long')
      return
    }
    try {
      setSubmitting(true)
      const res = await createComment(postId, text, parentId)
      setContent('')
      onPosted && onPosted(res)
    } catch (e) {
      alert(e.message || 'Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  if (!enabled) return null

  // Styles for reply mode vs main comment mode
  const containerClass = parentId 
    ? "mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700/50"
    : "bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors duration-300 mb-8"

  return (
    <div className={containerClass}>
      {!parentId && (
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          Add a comment
        </h3>
      )}
      <textarea
        className={`w-full bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-600 transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white ${parentId ? 'h-24 p-3' : 'h-32 p-4'}`}
        placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={1000}
        autoFocus={!!parentId}
      />
      <div className="mt-4 flex justify-end gap-3">
        {parentId && (
          <button
            className="px-4 py-2 text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            onClick={onCancel}
            disabled={submitting}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        )}
        <button
          className={`bg-gray-900 dark:bg-gray-700 text-white font-bold rounded-xl hover:bg-black dark:hover:bg-gray-600 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 ${parentId ? 'px-6 py-2 text-sm' : 'px-8 py-3'}`}
          onClick={handleSubmit}
          disabled={submitting || !content.trim()}
        >
          {submitting ? 'Posting...' : (parentId ? 'Reply' : 'Post Comment')}
        </button>
      </div>
    </div>
  )
}

export default CommentForm
