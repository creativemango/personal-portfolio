import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, publishBlogPost } from '../services/blogService'
import Pagination from '../components/Pagination'
import { useAuth } from '../context/AuthContext'
import { 
  LayoutDashboard, PenTool, FileText, Settings, LogOut, 
  Bold, Italic, Heading, Link as LinkIcon, Image, Code, 
  Send, Save, UploadCloud, X, Plus, Search, Pencil, Trash, Eye,
  CheckCircle, AlertCircle
} from 'lucide-react'

const CreatorCenter = () => {
  const { user } = useAuth()
  
  const VIEWS = {
    DASHBOARD: 'dashboard',
    CREATE: 'create',
    MANAGE: 'manage',
    SETTINGS: 'settings'
  }
  
  const [activeView, setActiveView] = useState(VIEWS.DASHBOARD)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    category: '技术',
    tags: ''
  })
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // Markdown Editor Ref
  const contentTextareaRef = useRef(null)

  useEffect(() => {
    if (activeView === VIEWS.MANAGE || activeView === VIEWS.DASHBOARD) {
      loadArticles(currentPage)
    }
  }, [activeView, currentPage])

  const loadArticles = async (page = 1) => {
    setLoading(true)
    try {
      const response = await getBlogPosts(page, pageSize)
      
      let articlesData = []
      let total = 0
      let pages = 1
      
      if (response && response.status === 100) {
        const pageData = response.data
        if (pageData && pageData.records) {
          articlesData = pageData.records
          total = pageData.total || 0
          pages = pageData.pages || 1
        }
      } else if (response && response.data) {
        articlesData = [response.data]
        total = 1
      }
      
      setArticles(articlesData)
      setTotalItems(total)
      setTotalPages(pages)
      
      if (page > pages && pages > 0) {
        setCurrentPage(1)
      }
    } catch (error) {
      console.error('Failed to load articles:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setArticleForm(prev => ({ ...prev, [name]: value }))
  }

  // Markdown Toolbar Handlers
  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = articleForm.content
    const before = text.substring(0, start)
    const selection = text.substring(start, end)
    const after = text.substring(end)

    const newContent = before + prefix + selection + suffix + after
    
    setArticleForm(prev => ({ ...prev, content: newContent }))
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  const handleSave = async (isPublish = false) => {
    if (!articleForm.title || !articleForm.content) {
      alert('标题和内容不能为空')
      return
    }

    try {
      const slug = articleForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      const blogPostData = {
        title: articleForm.title,
        slug: slug,
        content: articleForm.content,
        summary: articleForm.content.substring(0, 200) + '...',
        category: articleForm.category,
        tags: articleForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      let response
      if (editingArticle) {
        response = await updateBlogPost(editingArticle.id, blogPostData)
      } else {
        response = await createBlogPost(blogPostData)
      }

      if (response && response.status === 100) {
        const savedArticle = response.data
        
        if (isPublish) {
          const publishResponse = await publishBlogPost(savedArticle.id)
          if (publishResponse && publishResponse.status === 100) {
            alert('文章已发布！')
            setActiveView(VIEWS.MANAGE)
            resetForm()
          } else {
            throw new Error(publishResponse.message || '发布失败')
          }
        } else {
          alert('草稿已保存！')
          if (!editingArticle) {
            // If it was a new draft, switch to edit mode for the created draft
            setEditingArticle(savedArticle)
          }
        }
      } else {
        throw new Error(response.message || '保存失败')
      }
      
    } catch (error) {
      console.error('Operation failed:', error)
      alert('操作失败，请重试: ' + (error.message || '未知错误'))
    }
  }

  const handleDelete = async (id) => {
    if (confirm('确定要删除这篇文章吗？')) {
      try {
        await deleteBlogPost(id)
        loadArticles(currentPage)
      } catch (error) {
        console.error('Delete failed:', error)
      }
    }
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setArticleForm({
      title: article.title,
      content: article.content,
      category: article.category || '技术',
      tags: article.tags ? article.tags.join(', ') : ''
    })
    setActiveView(VIEWS.CREATE)
  }

  const resetForm = () => {
    setEditingArticle(null)
    setArticleForm({
      title: '',
      content: '',
      category: '技术',
      tags: ''
    })
  }

  const switchView = (view) => {
    if (view === VIEWS.CREATE && activeView !== VIEWS.CREATE) {
      resetForm()
    }
    setActiveView(view)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold">C</div>
          <span className="font-bold text-lg">Creator Center</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 mt-2">Main</div>
          <button 
            onClick={() => switchView(VIEWS.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${activeView === VIEWS.DASHBOARD ? 'bg-primary-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> 仪表盘
          </button>
          <button 
            onClick={() => switchView(VIEWS.CREATE)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${activeView === VIEWS.CREATE ? 'bg-primary-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <PenTool className="w-5 h-5" /> 写文章
          </button>
          <button 
            onClick={() => switchView(VIEWS.MANAGE)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${activeView === VIEWS.MANAGE ? 'bg-primary-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" /> 文章管理
          </button>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 mt-6">System</div>
          <button 
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white text-left text-slate-400"
          >
            <Settings className="w-5 h-5" /> 设置
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <img src={user?.avatar_url || "/images/default-avatar.png"} className="w-8 h-8 rounded-full border border-slate-600" alt="User" />
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-white truncate">{user?.name || user?.login}</div>
              <div className="text-xs text-slate-500 truncate">Creator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
        
        {/* Dashboard View */}
        {activeView === VIEWS.DASHBOARD && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">仪表盘</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">已发布文章</div>
                  <div className="text-3xl font-bold text-gray-900">{totalItems}</div>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FileText className="w-6 h-6" /></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">总阅读量</div>
                  <div className="text-3xl font-bold text-gray-900">0</div>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Eye className="w-6 h-6" /></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">草稿</div>
                  <div className="text-3xl font-bold text-gray-900">0</div>
                </div>
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><Pencil className="w-6 h-6" /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">开始创作</h3>
              <p className="text-gray-500 mb-6">分享你的想法，记录你的旅程</p>
              <button 
                onClick={() => switchView(VIEWS.CREATE)}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
              >
                <Plus className="w-5 h-5" /> 写文章
              </button>
            </div>
          </div>
        )}

        {/* Create/Edit View */}
        {activeView === VIEWS.CREATE && (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{editingArticle ? '编辑文章' : '新建文章'}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
              {/* Main Editor */}
              <div className="lg:col-span-9 flex flex-col gap-4 h-full">
                <input 
                  type="text" 
                  name="title"
                  value={articleForm.title}
                  onChange={handleInputChange}
                  placeholder="在此输入文章标题..." 
                  className="w-full text-2xl font-bold p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                />
                
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1 min-h-[500px]">
                  {/* Toolbar */}
                  <div className="border-b border-gray-200 p-2 flex gap-1 bg-gray-50 flex-wrap">
                    <button onClick={() => insertMarkdown('**', '**')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('*', '*')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('### ')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Heading"><Heading className="w-4 h-4" /></button>
                    <div className="w-px bg-gray-300 mx-1 h-6 self-center"></div>
                    <button onClick={() => insertMarkdown('[', '](url)')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Link"><LinkIcon className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('![alt](', ')')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Image"><Image className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('```\n', '\n```')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Code Block"><Code className="w-4 h-4" /></button>
                  </div>
                  
                  <textarea 
                    ref={contentTextareaRef}
                    name="content"
                    value={articleForm.content}
                    onChange={handleInputChange}
                    className="flex-1 p-4 focus:outline-none resize-none font-mono text-gray-800 text-base leading-relaxed" 
                    placeholder="# 正文内容..."
                  />
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="lg:col-span-3 space-y-6">
                {/* Publish Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase">发布设置</h4>
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleSave(true)}
                      className="w-full bg-primary-600 text-white font-medium py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> 发布文章
                    </button>
                    <button 
                      onClick={() => handleSave(false)}
                      className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" /> 保存草稿
                    </button>
                  </div>
                </div>

                {/* Properties Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase">属性</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">分类</label>
                      <select 
                        name="category"
                        value={articleForm.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white"
                      >
                        <option value="技术">技术</option>
                        <option value="生活">生活</option>
                        <option value="读书">读书</option>
                        <option value="旅行">旅行</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">标签</label>
                      <input 
                        type="text" 
                        name="tags"
                        value={articleForm.tags}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                        placeholder="Tag1, Tag2..." 
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Image Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase">封面图</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-primary-400 transition bg-gray-50">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span className="text-xs">点击上传封面</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manage View */}
        {activeView === VIEWS.MANAGE && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">文章管理</h2>
              <button 
                onClick={() => switchView(VIEWS.CREATE)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> 新建文章
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    placeholder="搜索文章..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                  <option>所有状态</option>
                  <option>已发布</option>
                  <option>草稿</option>
                </select>
              </div>

              {loading ? (
                <div className="p-8 text-center text-gray-500">加载中...</div>
              ) : articles.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <p className="mb-4">暂无文章</p>
                  <button onClick={() => switchView(VIEWS.CREATE)} className="text-primary-600 font-medium hover:underline">去写一篇</button>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3">标题</th>
                      <th className="px-6 py-3 w-32">状态</th>
                      <th className="px-6 py-3 w-32">分类</th>
                      <th className="px-6 py-3 w-40">日期</th>
                      <th className="px-6 py-3 w-32 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50/50 transition group">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <Link to={`/post/${article.id}`} target="_blank" className="hover:text-primary-600 hover:underline">
                            {article.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          {article.published ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-100">
                              <CheckCircle className="w-3 h-3" /> 已发布
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-yellow-100">
                              <AlertCircle className="w-3 h-3" /> 草稿
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-500">{article.category || '-'}</td>
                        <td className="px-6 py-4 text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(article)} className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="编辑"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(article.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="删除"><Trash className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalItems}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default CreatorCenter
