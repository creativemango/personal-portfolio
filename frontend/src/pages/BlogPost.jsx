import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostById } from '../services/blogService'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { 
  ArrowLeft, Calendar, Clock, MessageSquare, ThumbsUp, 
  Share2, Twitter, Facebook, Link as LinkIcon 
} from 'lucide-react'
import MermaidDiagram from '../components/MermaidDiagram'

// Import highlight.js styles
import 'highlight.js/styles/github-dark.css'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await getBlogPostById(id)
        if (data) {
          setPost(data)
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

  const [headings, setHeadings] = useState([])

  useEffect(() => {
    if (post && post.content) {
      // Extract headings
      const lines = post.content.split('\n');
      const extractedHeadings = [];
      lines.forEach(line => {
        const match = line.match(/^(#{1,3})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          const id = text.toLowerCase().trim().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
          extractedHeadings.push({ level, text, id });
        }
      });
      setHeadings(extractedHeadings);
    }
  }, [post])

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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-96 bg-gray-900 overflow-hidden mb-10">
        {post.coverImage ? (
          <>
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-60"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/default_article_cover.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90"></div>
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Link to="/home" className="absolute top-8 left-4 sm:left-8 inline-flex items-center text-white/80 hover:text-white transition bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> 返回首页
          </Link>
          
          <div className="flex items-center gap-3 text-white/80 text-sm font-medium mb-4">
            <span className="bg-primary-600/90 text-white px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">{post.category || '未分类'}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown'}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Card */}
          <main className="col-span-1 lg:col-span-9">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-10">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-2xl prose-img:shadow-md">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    h1: ({children}) => {
                      const id = String(children).toLowerCase().trim().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
                      return <h1 id={id} className="scroll-mt-32">{children}</h1>
                    },
                    h2: ({children}) => {
                      const id = String(children).toLowerCase().trim().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
                      return <h2 id={id} className="scroll-mt-32 border-b border-gray-100 pb-2">{children}</h2>
                    },
                    h3: ({children}) => {
                      const id = String(children).toLowerCase().trim().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
                      return <h3 id={id} className="scroll-mt-32">{children}</h3>
                    },
                    pre: ({children, ...props}) => {
                      const hasMermaid = React.Children.toArray(children).some(child => 
                        React.isValidElement(child) && 
                        child.props.className && 
                        child.props.className.includes('mermaid')
                      );
                      if (hasMermaid) {
                        return <div className="my-8">{children}</div>;
                      }
                      return <pre {...props} className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6">{children}</pre>;
                    },
                    code({node, inline, className, children, ...props}) {
                      const isMermaid = !inline && className && className.includes('mermaid');
                      if (isMermaid) {
                        return <MermaidDiagram code={String(children).replace(/\n$/, '')} />
                      }
                      return !inline ? (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="bg-gray-100 text-primary-700 px-1.5 py-0.5 rounded font-mono text-sm border border-gray-200" {...props}>
                          {children}
                        </code>
                      )
                    },
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-primary-500 bg-primary-50/50 pl-6 py-4 rounded-r-xl italic text-gray-700 my-6">
                        {children}
                      </blockquote>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags Section */}
              <div className="mt-16 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" /> Tags:
                  </span>
                  {post.tags && post.tags.length > 0 ? post.tags.map((tag, idx) => (
                     <span key={idx} className="px-4 py-1.5 bg-gray-100 text-sm font-medium text-gray-600 rounded-full hover:bg-primary-50 hover:text-primary-600 transition cursor-pointer">
                       #{tag}
                     </span>
                  )) : (
                    <span className="text-gray-400 text-sm italic">No tags</span>
                  )}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                  <MessageSquare className="w-6 h-6" />
                </div>
                Comments
              </h3>
              
              <div className="flex gap-6 mb-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-xl shrink-0">
                  ?
                </div>
                <div className="flex-1">
                  <textarea 
                    className="w-full bg-gray-50 border-0 p-4 rounded-xl h-32 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all resize-none placeholder-gray-400" 
                    placeholder="Share your thoughts..."
                  ></textarea>
                  <div className="mt-4 flex justify-end">
                    <button className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Empty State */}
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">No comments yet. Be the first to share your thoughts!</p>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar (Sticky TOC) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="sticky top-8">
              {/* Author Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Author</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/images/default-avatar.png" alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Admin</div>
                    <div className="text-xs text-gray-500">Content Creator</div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                <h2 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2 sticky top-0 bg-white z-10 pb-2 border-b border-gray-50">
                  目录
                </h2>
                <nav className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                  <ul className="space-y-1 relative">
                    {headings.length > 0 ? headings.map((heading, index) => (
                      <li key={index} className={`pl-${(heading.level - 1) * 3}`}>
                        <a 
                          href={`#${heading.id}`} 
                          className={`block py-1.5 pl-4 border-l-2 text-sm transition-all duration-200 ${
                            heading.level === 1 
                              ? 'border-transparent text-gray-900 font-bold hover:border-primary-500 hover:text-primary-600' 
                              : 'border-transparent text-gray-500 hover:border-primary-300 hover:text-primary-600'
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    )) : (
                      <li className="pl-4 py-2 text-sm text-gray-400 italic">No headings found</li>
                    )}
                  </ul>
                </nav>
              </div>
              
              {/* Share Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Share this post</h4>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition flex items-center justify-center">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition flex items-center justify-center">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
