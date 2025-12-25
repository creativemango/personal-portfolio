import React, { useState, useEffect } from 'react'
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, publishBlogPost, uploadCover } from '../services/blogService'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, PenTool, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import DashboardStats from '../components/creator/DashboardStats'
import ArticleList from '../components/creator/ArticleList'
import ArticleEditor from '../components/creator/ArticleEditor'

const CreatorCenter = () => {
  const { user } = useAuth()
  
  const VIEWS = {
    DASHBOARD: 'dashboard',
    CREATE: 'create',
    MANAGE: 'manage',
    SETTINGS: 'settings'
  }
  
  const [activeView, setActiveView] = useState(VIEWS.DASHBOARD)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  
  // Stats State
  const [stats, setStats] = useState({
    published: 0,
    drafts: 0,
    views: 0
  })

  // Editor Settings State
  const [editorSettings, setEditorSettings] = useState({
    autoSaveEnabled: true,
    autoSaveInterval: 30000
  })

  // Filters State
  const [filters, setFilters] = useState({
    keyword: '',
    status: ''
  })

  useEffect(() => {
    if (activeView === VIEWS.MANAGE || activeView === VIEWS.DASHBOARD) {
      loadArticles(currentPage)
      loadStats()
    }
  }, [activeView, currentPage, filters])

  const loadStats = async () => {
    try {
      // Fetch published count (page 1, size 1 just to get total)
      const publishedRes = await getBlogPosts(1, 1, '', 'PUBLISHED')
      const publishedCount = publishedRes.total || 0
      
      // Fetch draft count
      const draftRes = await getBlogPosts(1, 1, '', 'DRAFT')
      const draftCount = draftRes.total || 0
      
      setStats(prev => ({
        ...prev,
        published: publishedCount,
        drafts: draftCount
      }))
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const loadArticles = async (page = 1) => {
    setLoading(true)
    try {
      const response = await getBlogPosts(page, pageSize, filters.keyword, filters.status)
      
      let articlesData = []
      let total = 0
      let pages = 1
      
      // API interceptor unwraps the response, so we get the Page object directly
      if (response && response.records) {
        articlesData = response.records
        total = response.total || 0
        pages = response.pages || 1
      } else if (Array.isArray(response)) {
        // Fallback if it returns a list
        articlesData = response
        total = response.length
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleSave = async (formData, isPublish = false, isAutoSave = false) => {
    try {
      let slug = formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\u4e00-\u9fa5-]+/g, '-')
        .replace(/^-+|-+$/g, '')

      if (!slug) {
        slug = `post-${Date.now()}`
      }
      
      const blogPostData = {
        title: formData.title,
        slug: slug,
        content: formData.content,
        summary: formData.content.substring(0, 200) + '...',
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      let savedArticle
      if (editingArticle) {
        // Only include coverFilePath for updates (to handle clearing/changing existing covers)
        const updateData = {
          ...blogPostData,
          coverFilePath: formData.coverFilePath && formData.coverFilePath.startsWith('data:') ? null : formData.coverFilePath
        }
        savedArticle = await updateBlogPost(editingArticle.id, updateData)
      } else {
        savedArticle = await createBlogPost(blogPostData)
      }

      // Upload cover image if pending
      if (formData.coverFile) {
        try {
          const coverUrl = await uploadCover(savedArticle.id, formData.coverFile)
          savedArticle.coverFilePath = coverUrl
        } catch (uploadError) {
          console.error('Failed to upload cover image:', uploadError)
          if (!isAutoSave) alert('Article saved but cover image upload failed.')
        }
      }

      if (isPublish) {
        await publishBlogPost(savedArticle.id)
        alert('Article published!')
        setActiveView(VIEWS.MANAGE)
        setEditingArticle(null)
      } else {
        if (!isAutoSave) {
            alert('Draft saved!')
        }
        if (!editingArticle) {
          // If it was a new draft, switch to edit mode for the created draft
          setEditingArticle(savedArticle)
        }
      }
      
      return savedArticle
    } catch (error) {
      if (!isAutoSave) {
        console.error('Operation failed:', error)
        alert('Operation failed, please try again: ' + (error.message || 'Unknown error'))
      } else {
        console.warn('Auto-save failed:', error)
      }
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteBlogPost(id)
        loadArticles(currentPage)
      } catch (error) {
        console.error('Delete failed:', error)
        alert('Delete failed: ' + error.message)
      }
    }
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setActiveView(VIEWS.CREATE)
  }

  const switchView = (view) => {
    if (view === VIEWS.CREATE) {
      setEditingArticle(null)
    }
    setActiveView(view)
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-gray-50 flex flex-col md:flex-row transition-all duration-300">
      {/* Sidebar */}
      <aside className={`bg-[#0B1120] text-gray-400 flex flex-col shrink-0 transition-all duration-300 border-r border-gray-800 shadow-2xl relative h-full ${isSidebarCollapsed ? 'w-full md:w-20' : 'w-full md:w-64'}`}>
        {/* Header */}
        <div className={`flex items-center h-20 border-b border-gray-800/50 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center p-2' : 'justify-between p-6'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-900/20 shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div className={`flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0 hidden' : 'block'}`}>
              <span className="font-bold text-gray-100 text-lg tracking-tight whitespace-nowrap">Creator Hub</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Workspace</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar min-h-0">
          <div className={`text-xs font-bold text-gray-600 uppercase tracking-wider mb-4 px-3 mt-4 transition-all duration-300 ${isSidebarCollapsed ? 'md:text-center md:text-[10px]' : ''}`}>
            {isSidebarCollapsed ? 'Menu' : 'Main Menu'}
          </div>
          
          <button 
            onClick={() => switchView(VIEWS.DASHBOARD)}
            className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
              activeView === VIEWS.DASHBOARD 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
                : 'hover:bg-gray-800/50 hover:text-gray-200'
            } ${isSidebarCollapsed ? 'md:justify-center' : ''}`}
            title={isSidebarCollapsed ? "Dashboard" : ""}
          >
            {activeView === VIEWS.DASHBOARD && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/20 rounded-r-full"></div>}
            <LayoutDashboard className={`w-5 h-5 shrink-0 transition-colors ${activeView === VIEWS.DASHBOARD ? 'text-white' : 'group-hover:text-white'}`} /> 
            <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'md:hidden' : 'block'}`}>Dashboard</span>
          </button>
          
          <button 
            onClick={() => switchView(VIEWS.CREATE)}
            className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
              activeView === VIEWS.CREATE 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
                : 'hover:bg-gray-800/50 hover:text-gray-200'
            } ${isSidebarCollapsed ? 'md:justify-center' : ''}`}
            title={isSidebarCollapsed ? "Write Article" : ""}
          >
            {activeView === VIEWS.CREATE && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/20 rounded-r-full"></div>}
            <PenTool className={`w-5 h-5 shrink-0 transition-colors ${activeView === VIEWS.CREATE ? 'text-white' : 'group-hover:text-white'}`} /> 
            <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'md:hidden' : 'block'}`}>Write Article</span>
          </button>
          
          <button 
            onClick={() => switchView(VIEWS.MANAGE)}
            className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
              activeView === VIEWS.MANAGE 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
                : 'hover:bg-gray-800/50 hover:text-gray-200'
            } ${isSidebarCollapsed ? 'md:justify-center' : ''}`}
            title={isSidebarCollapsed ? "Manage Article" : ""}
          >
            {activeView === VIEWS.MANAGE && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/20 rounded-r-full"></div>}
            <FileText className={`w-5 h-5 shrink-0 transition-colors ${activeView === VIEWS.MANAGE ? 'text-white' : 'group-hover:text-white'}`} /> 
            <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'md:hidden' : 'block'}`}>Manage Article</span>
          </button>

          <div className={`text-xs font-bold text-gray-600 uppercase tracking-wider mb-4 px-3 mt-8 transition-all duration-300 ${isSidebarCollapsed ? 'md:text-center md:text-[10px]' : ''}`}>
            {isSidebarCollapsed ? 'Sys' : 'System'}
          </div>
          
          <button 
            onClick={() => switchView(VIEWS.SETTINGS)}
            className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
              activeView === VIEWS.SETTINGS 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
                : 'hover:bg-gray-800/50 hover:text-gray-200'
            } ${isSidebarCollapsed ? 'md:justify-center' : ''}`}
            title={isSidebarCollapsed ? "Settings" : ""}
          >
            {activeView === VIEWS.SETTINGS && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/20 rounded-r-full"></div>}
            <Settings className={`w-5 h-5 shrink-0 transition-colors ${activeView === VIEWS.SETTINGS ? 'text-white' : 'group-hover:text-white'}`} /> 
            <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'md:hidden' : 'block'}`}>Settings</span>
          </button>
        </nav>

        {/* User Profile */}
        <div className="relative p-4 border-t border-gray-800/50 bg-gray-900/50 mt-auto">
          <div className={`flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer ${isSidebarCollapsed ? 'md:justify-center' : ''}`}>
            <div className="relative shrink-0">
              <img src={user?.avatar_url || "/images/default-avatar.png"} className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-sm" alt="User" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'md:w-0 md:opacity-0' : 'block'}`}>
              <div className="text-sm font-bold text-gray-200 truncate">{user?.name || user?.login}</div>
              <div className="text-xs text-gray-500 truncate">Content Creator</div>
            </div>
          </div>
          
          {/* Collapse Button (Attached to User Profile) */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-50 hidden md:flex w-6 h-6 items-center justify-center rounded-full bg-primary-600 hover:bg-primary-500 text-white transition-all shadow-lg border border-primary-400"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 ${activeView === VIEWS.CREATE ? 'p-0' : 'p-4 md:p-8'}`}>
        
        {/* Dashboard View */}
        {activeView === VIEWS.DASHBOARD && (
          <DashboardStats 
            stats={stats}
            onWriteClick={() => switchView(VIEWS.CREATE)} 
          />
        )}

        {/* Create/Edit View */}
        {activeView === VIEWS.CREATE && (
          <ArticleEditor 
            initialData={editingArticle}
            onSave={handleSave}
            isSaving={loading}
            autoSaveEnabled={editorSettings.autoSaveEnabled}
            autoSaveInterval={editorSettings.autoSaveInterval}
          />
        )}

        {/* Manage View */}
        {activeView === VIEWS.MANAGE && (
          <ArticleList 
            articles={articles}
            loading={loading}
            filters={filters}
            onFilterChange={handleFilterChange}
            pagination={{
              currentPage,
              totalPages,
              totalItems,
              onPageChange: setCurrentPage
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateClick={() => switchView(VIEWS.CREATE)}
          />
        )}

        {/* Settings View */}
        {activeView === VIEWS.SETTINGS && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Settings</h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Editor Preferences</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Auto Save</div>
                  <div className="text-sm text-gray-500">Automatically save your draft while writing</div>
                </div>
                <button 
                  onClick={() => setEditorSettings(prev => ({...prev, autoSaveEnabled: !prev.autoSaveEnabled}))}
                  className={`w-12 h-7 rounded-full transition-colors relative ${editorSettings.autoSaveEnabled ? 'bg-primary-600' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm transition-transform ${editorSettings.autoSaveEnabled ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              
              <div className={`transition-all duration-300 ${editorSettings.autoSaveEnabled ? 'opacity-100 max-h-40' : 'opacity-50 max-h-40 pointer-events-none'}`}>
                <label className="block text-sm font-bold text-gray-700 mb-3">Save Interval</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: '10s', value: 10000 },
                    { label: '30s', value: 30000 },
                    { label: '1m', value: 60000 },
                    { label: '5m', value: 300000 }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setEditorSettings(prev => ({...prev, autoSaveInterval: option.value}))}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        editorSettings.autoSaveInterval === option.value
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CreatorCenter
