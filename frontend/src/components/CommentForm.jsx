import React, { useState } from 'react'
import { createComment } from '../services/commentService'
import { MessageSquare } from 'lucide-react'

const CommentForm = ({ postId, enabled, onPosted }) => {
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
      const res = await createComment(postId, text)
      setContent('')
      onPosted && onPosted(res)
    } catch (e) {
      alert(e.message || 'Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  if (!enabled) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors duration-300 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
          <MessageSquare className="w-6 h-6" />
        </div>
        Add a comment
      </h3>
      <textarea
        className="w-full bg-gray-50 dark:bg-gray-700 border-0 p-4 rounded-xl h-32 focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-600 transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={1000}
      />
      <div className="mt-4 flex justify-end">
        <button
          className="px-8 py-3 bg-gray-900 dark:bg-gray-700 text-white font-bold rounded-xl hover:bg-black dark:hover:bg-gray-600 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60"
          onClick={handleSubmit}
          disabled={submitting || !content.trim()}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </div>
  )
}

export default CommentForm

