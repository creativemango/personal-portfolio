import React, { useEffect, useState } from 'react'
import { getComments, deleteComment, likeComment } from '../services/commentService'
import { useAuth } from '../context/AuthContext'
import { MessageSquare, Trash2, Reply, ThumbsUp } from 'lucide-react'
import ConfirmDialog from './ConfirmDialog'
import UserAvatar from './UserAvatar'
import CommentForm from './CommentForm'

// Helper to flatten the nested tree into a list for the "flat" view
const flattenChildren = (children) => {
  let res = []
  if (!children) return res
  children.forEach(child => {
    res.push(child)
    if (child.children && child.children.length > 0) {
      res = res.concat(flattenChildren(child.children))
    }
  })
  return res
}

const CommentItem = ({ comment, depth = 0, canDelete, onDelete, onReply, replyToId, onCancelReply, onPosted, postId, user }) => {
  const isReplying = replyToId === comment.id
  const isRoot = depth === 0
  const [likes, setLikes] = useState(comment.likeCount || 0)
  const [isLiked, setIsLiked] = useState(comment.isLiked || false)
  
  // For root comments, we get all flattened descendants
  // For replies (depth > 0), we don't process children here as they are already in the flattened list of the root
  const replies = isRoot ? flattenChildren(comment.children) : []

  const handleLike = async () => {
    if (!user) return

    // Optimistic update
    const newIsLiked = !isLiked
    const newLikes = newIsLiked ? likes + 1 : Math.max(0, likes - 1)
    
    setLikes(newLikes)
    setIsLiked(newIsLiked)

    try {
      await likeComment(comment.id)
    } catch (error) {
      console.error('Failed to toggle like', error)
      // Revert on error
      setLikes(likes)
      setIsLiked(isLiked)
      alert(error.response?.data?.message || 'Failed to like comment')
    }
  }

  // Determine avatar source
  const avatarSrc = comment.authorName === 'admin' 
    ? '/images/default-avatar.png' 
    : (comment.avatarUrl || '/images/visitor-avatar.png')

  return (
    <div className={`${isRoot ? 'border-b border-gray-100 dark:border-gray-700/50 last:border-0 pb-6 mb-6 last:pb-0 last:mb-0' : 'mt-4 first:mt-0'}`}>
      <div className="flex gap-3 md:gap-4 items-start group">
        <div className="shrink-0">
           <UserAvatar 
             src={avatarSrc} 
             name={comment.authorName} 
             size={isRoot ? "md" : "sm"} 
           />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <span className={`font-semibold text-gray-900 dark:text-white truncate ${isRoot ? 'text-base' : ''}`}>
                {comment.authorName || 'Anonymous'}
              </span>
              
              {!isRoot && comment.replyToUser && (
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <span className="text-gray-400">reply to</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    @{comment.replyToUser}
                  </span>
                </div>
              )}

              <span className="text-gray-400 text-xs ml-1">
                {formatDate(comment.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className={`flex items-center gap-1 transition-colors text-xs font-medium ${isLiked ? 'text-primary-600' : 'text-gray-400 hover:text-primary-600'}`}
                onClick={handleLike}
                title={isLiked ? "Unlike" : "Like"}
                disabled={!user}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{likes > 0 ? likes : 'Like'}</span>
              </button>

              {user && (
                <button
                  className="flex items-center gap-1 text-gray-400 hover:text-primary-600 transition-colors text-xs font-medium"
                  onClick={() => onReply(comment.id)}
                  title="Reply"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reply</span>
                </button>
              )}
              {canDelete(comment) && (
                <button
                  className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors text-xs font-medium"
                  onClick={() => onDelete(comment.id)}
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              )}
            </div>
          </div>
          
          <div className={`mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words leading-relaxed ${isRoot ? 'text-base' : 'text-sm'}`}>
            {comment.content}
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-3">
              <CommentForm
                postId={postId}
                enabled={true}
                parentId={comment.id}
                onCancel={onCancelReply}
                onPosted={() => {
                  onCancelReply()
                  onPosted()
                }}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Render Flattened Replies for Root Comment */}
      {isRoot && replies.length > 0 && (
        <div className="mt-4 ml-3 md:ml-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 md:p-5">
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              canDelete={canDelete}
              onDelete={onDelete}
              onReply={onReply}
              replyToId={replyToId}
              onCancelReply={onCancelReply}
              onPosted={onPosted}
              postId={postId}
              user={user}
              rootId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const CommentList = ({ postId, refreshKey }) => {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null })
  const [replyToId, setReplyToId] = useState(null)

  const canDelete = (comment) => {
    if (!user) return false
    if (user.role === 'ADMIN') return true
    return user.id && comment.userId && String(user.id) === String(comment.userId)
  }

  const buildTree = (comments) => {
    const map = {}
    const roots = []
    
    // Deep clone to avoid mutating state directly
    const list = comments.map(c => ({ ...c, children: [] }))
    
    // First pass: map ID to object
    list.forEach(c => {
      map[c.id] = c
    })
    
    // Second pass: link children and add reply info
    list.forEach(c => {
      if (c.parentId && map[c.parentId]) {
        // Add replyToUser info for display
        c.replyToUser = map[c.parentId].authorName
        map[c.parentId].children.push(c)
      } else {
        roots.push(c)
      }
    })
    
    return roots
  }

  const fetchComments = async () => {
    try {
      setLoading(true)
      const res = await getComments(postId, 1, 100)
      const rawItems = (res && Array.isArray(res)) ? res : (res?.records || res?.items || [])
      setItems(rawItems)
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

  const rootComments = buildTree(items)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-10 transition-colors duration-300">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        Comments
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{items.length}</span>
      </h3>
      
      {loading && <div className="text-gray-500 dark:text-gray-400 text-center py-4">Loading comments...</div>}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
      
      {!loading && items.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
      
      <div className="space-y-2">
        {rootComments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            canDelete={canDelete}
            onDelete={handleDelete}
            onReply={setReplyToId}
            replyToId={replyToId}
            onCancelReply={() => setReplyToId(null)}
            onPosted={fetchComments}
            postId={postId}
            user={user}
          />
        ))}
      </div>
      
      <ConfirmDialog
        open={confirmDelete.open}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
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
