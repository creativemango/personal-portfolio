import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostById } from '../services/blogService'
import ReactMarkdown from 'react-markdown'
import { 
  ArrowLeft, Calendar, Clock, MessageSquare, ThumbsUp, 
  Share2, Twitter, Facebook, Link as LinkIcon 
} from 'lucide-react'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await getBlogPostById(id)
        if (response && response.status === 100) {
          setPost(response.data)
        } else {
          setError('文章加载失败')
        }
      } catch (err) {
        console.error('Failed to fetch post:', err)
        setError('文章加载失败')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-red-500 mb-4">{error || '文章不存在'}</div>
        <Link to="/home" className="text-primary-600 hover:underline">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 侧边目录 (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider text-gray-500">目录</h4>
              <nav className="space-y-1 border-l-2 border-gray-100">
                {/* 简单的占位目录，实际项目中可以解析 Markdown 生成 */}
                <a href="#" className="block pl-4 py-1 text-sm font-medium text-primary-600 border-l-2 border-primary-600 -ml-[2px]">1. 正文</a>
              </nav>
              
              <div className="mt-8">
                <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider text-gray-500">分享</h4>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"><Twitter className="w-4 h-4" /></button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition"><Facebook className="w-4 h-4" /></button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"><LinkIcon className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </aside>

          {/* 正文内容 */}
          <article className="col-span-1 lg:col-span-9 max-w-3xl">
            <div className="mb-8">
              <Link to="/home" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-6 transition">
                <ArrowLeft className="w-4 h-4 mr-1" /> 返回首页
              </Link>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-medium">{post.category || '未分类'}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown'}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
              <div className="rounded-xl overflow-hidden shadow-sm h-64 md:h-96 w-full bg-gray-200 flex items-center justify-center">
                 {/* Placeholder for cover image */}
                 <span className="text-4xl">🖼️</span>
              </div>
            </div>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-xl">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* 底部标签与作者 */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-bold text-gray-900 mr-2">标签:</span>
                {post.tags && post.tags.length > 0 ? post.tags.map((tag, idx) => (
                   <span key={idx} className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-gray-200 transition">#{tag}</span>
                )) : (
                  <span className="text-gray-500 text-sm">无标签</span>
                )}
              </div>
            </div>

            {/* 评论区 (Static UI) */}
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary-500" /> 评论
              </h3>
              
              {/* 评论输入框 */}
              <div className="flex gap-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">U</div>
                <div className="flex-1">
                  <textarea className="w-full border border-gray-300 p-4 rounded-xl h-24 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none bg-white" placeholder="写下你的想法..."></textarea>
                  <div className="mt-3 text-right">
                    <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition shadow-sm">发表评论</button>
                  </div>
                </div>
              </div>

              {/* 评论列表 (Empty state for now) */}
              <div className="text-center text-gray-500 py-8">
                暂无评论，快来抢沙发吧！
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
