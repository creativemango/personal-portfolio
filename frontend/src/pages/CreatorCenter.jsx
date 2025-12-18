import React, { useState, useEffect } from 'react'
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../services/blogService'
import Pagination from '../components/Pagination'
import { useAuth } from '../context/AuthContext'

const CreatorCenter = () => {
  const { user } = useAuth()
  // 视图状态枚举
  const VIEWS = {
    NONE: null,
    CREATE: 'create',
    MANAGE: 'manage',
    STATS: 'stats',
    SETTINGS: 'settings'
  }
  
  const [activeView, setActiveView] = useState(VIEWS.NONE)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  })
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // 加载文章列表
  useEffect(() => {
    if (activeView === VIEWS.MANAGE) {
      loadArticles(currentPage)
    }
  }, [activeView, currentPage, VIEWS.MANAGE])

  const loadArticles = async (page = 1) => {
    setLoading(true)
    try {
      // 调用分页接口，传递当前页码和每页大小
      const response = await getBlogPosts(page, pageSize)
      console.log('文章列表响应:', response)
      
      // 处理分页响应数据结构
      let articlesData = []
      let total = 0
      let pages = 1
      
      if (response && response.status === 100) {
        // 新的分页响应结构
        const pageData = response.data
        if (pageData && pageData.records && Array.isArray(pageData.records)) {
          articlesData = pageData.records
          total = pageData.total || 0
          pages = pageData.pages || 1
        }
      } else if (response && response.data) {
        // 如果 data 不是数组，尝试将其转换为数组
        articlesData = [response.data]
        total = 1
        pages = 1
      }
      
      setArticles(articlesData)
      setTotalItems(total)
      setTotalPages(pages)
      
      // 如果当前页码大于总页数，重置为第一页
      if (page > pages && pages > 0) {
        setCurrentPage(1)
      }
    } catch (error) {
      console.error('加载文章失败:', error)
      setArticles([])
      setTotalItems(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  // 处理页码变化
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setArticleForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateArticle = async (e) => {
    e.preventDefault()
    try {
      // 生成slug（URL友好的标题）
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
      
      await createBlogPost(blogPostData)
      alert('文章创建成功！')
      setActiveView(VIEWS.NONE)
      setArticleForm({
        title: '',
        content: '',
        category: '',
        tags: ''
      })
      // 如果正在查看文章管理，重新加载文章列表，保持当前页码
      if (activeView === VIEWS.MANAGE) {
        loadArticles(currentPage)
      }
    } catch (error) {
      console.error('创建文章失败:', error)
      alert('创建文章失败，请重试')
    }
  }

  const handleEditArticle = (article) => {
    setEditingArticle(article)
    setArticleForm({
      title: article.title,
      content: article.content,
      category: article.category || '',
      tags: article.tags ? article.tags.join(', ') : ''
    })
    setActiveView(VIEWS.CREATE)
  }

  const handleUpdateArticle = async (e) => {
    e.preventDefault()
    try {
      const blogPostData = {
        title: articleForm.title,
        content: articleForm.content,
        summary: articleForm.content.substring(0, 200) + '...',
        category: articleForm.category,
        tags: articleForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      await updateBlogPost(editingArticle.id, blogPostData)
      alert('文章更新成功！')
      setActiveView(VIEWS.NONE)
      setEditingArticle(null)
      setArticleForm({
        title: '',
        content: '',
        category: '',
        tags: ''
      })
      loadArticles(currentPage)
    } catch (error) {
      console.error('更新文章失败:', error)
      alert('更新文章失败，请重试')
    }
  }

  const handleDeleteArticle = async (articleId) => {
    if (confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
      try {
        await deleteBlogPost(articleId)
        alert('文章删除成功！')
        loadArticles(currentPage)
      } catch (error) {
        console.error('删除文章失败:', error)
        alert('删除文章失败，请重试')
      }
    }
  }

  const closeModal = () => {
    setActiveView(VIEWS.NONE)
    setEditingArticle(null)
    setArticleForm({
      title: '',
      content: '',
      category: '',
      tags: ''
    })
  }

  return (
    <div className="page">
      <div className="container">
        {/* 页面标题 */}
        <div className="welcome-section">
          <h1>创作者中心</h1>
          <p>管理您的博客内容和创作</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '250px 1fr', 
          gap: '2rem',
          minHeight: '600px'
        }}>
          {/* 左侧操作栏 */}
          <div className="card" style={{ 
            background: '#f8f9fa',
            padding: '1.5rem'
          }}>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '1.5rem', 
              borderBottom: '2px solid #667eea', 
              paddingBottom: '0.5rem' 
            }}>
              创作工具
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={() => setActiveView(activeView === VIEWS.CREATE ? VIEWS.NONE : VIEWS.CREATE)}
                className="btn btn-primary"
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  background: activeView === VIEWS.CREATE ? '#667eea' : '#e9ecef',
                  border: 'none',
                  borderRadius: '6px',
                  color: activeView === VIEWS.CREATE ? 'white' : '#495057',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: activeView === VIEWS.CREATE ? '500' : 'normal'
                }}
              >
                ✏️ 写文章
              </button>
              
              <button 
                onClick={() => setActiveView(activeView === VIEWS.MANAGE ? VIEWS.NONE : VIEWS.MANAGE)}
                className="btn"
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  background: activeView === VIEWS.MANAGE ? '#667eea' : '#e9ecef',
                  border: 'none',
                  borderRadius: '6px',
                  color: activeView === VIEWS.MANAGE ? 'white' : '#495057',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: activeView === VIEWS.MANAGE ? '500' : 'normal'
                }}
              >
                📊 文章管理
              </button>
              
              <button 
                className="btn"
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  background: '#e9ecef',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#495057',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                disabled
              >
                📈 数据统计
              </button>
              
              <button 
                className="btn"
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  background: '#e9ecef',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#495057',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                disabled
              >
                ⚙️ 设置
              </button>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2rem', 
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <img
                src={user.avatar_url || "/images/default-avatar.png"}
                alt="用户头像"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '3px solid #667eea'
                }}
                onError={(e) => {
                  e.target.src = '/images/default-avatar.png'
                }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>
                  {user.name || user.login}
                </h2>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  创作者 · {user.email || '未设置邮箱'}
                </p>
                {user.bio && (
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>{user.bio}</p>
                )}
              </div>
            </div>

            {/* 创作统计 */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#667eea' 
                }}>
                  {articles.filter(article => article.published).length}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>已发布文章</div>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#28a745' 
                }}>
                  {articles.filter(article => !article.published).length}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>草稿</div>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#ffc107' 
                }}>
                  0
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>总阅读量</div>
              </div>
            </div>

            {/* 文章管理界面 */}
            {activeView === VIEWS.MANAGE ? (
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ 
                    color: '#333', 
                    margin: 0, 
                    borderBottom: '2px solid #667eea', 
                    paddingBottom: '0.5rem' 
                  }}>
                    文章管理
                  </h3>
                  <button 
                    onClick={() => setActiveView(VIEWS.NONE)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #ddd',
                      background: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    返回
                  </button>
                </div>

                {loading ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>加载中...</p>
                  </div>
                ) : (
                  <div>
                    {articles.length === 0 ? (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '3rem', 
                        background: '#f8f9fa', 
                        borderRadius: '8px' 
                      }}>
                        <h4 style={{ color: '#666', marginBottom: '1rem' }}>暂无文章</h4>
                        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                          您还没有创建任何文章，点击"写文章"开始创作吧！
                        </p>
                        <button 
                          onClick={() => setActiveView(VIEWS.CREATE)}
                          style={{
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            background: '#667eea',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                          }}
                        >
                          写文章
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ 
                          display: 'grid', 
                          gap: '1rem' 
                        }}>
                          {articles.map((article) => (
                            <div 
                              key={article.id}
                              style={{
                                background: '#f8f9fa',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid #e9ecef'
                              }}
                            >
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'flex-start',
                                marginBottom: '1rem'
                              }}>
                                <div style={{ flex: 1 }}>
                                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                                    {article.title}
                                  </h4>
                                  <p style={{ 
                                    color: '#666', 
                                    fontSize: '0.9rem', 
                                    marginBottom: '0.5rem' 
                                  }}>
                                    {article.summary || article.content?.substring(0, 100) + '...'}
                                  </p>
                                  <div style={{ 
                                    display: 'flex', 
                                    gap: '1rem', 
                                    fontSize: '0.8rem',
                                    color: '#666'
                                  }}>
                                    <span>创建时间: {new Date(article.createdAt).toLocaleDateString()}</span>
                                    <span>状态: {article.published ? '已发布' : '草稿'}</span>
                                    {article.category && (
                                      <span>分类: {article.category}</span>
                                    )}
                                  </div>
                                </div>
                                <div style={{ 
                                  display: 'flex', 
                                  gap: '0.5rem',
                                  flexDirection: 'column'
                                }}>
                                  <button 
                                    onClick={() => handleEditArticle(article)}
                                    style={{
                                      padding: '0.5rem 1rem',
                                      border: '1px solid #667eea',
                                      background: 'white',
                                      color: '#667eea',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      fontSize: '0.8rem'
                                    }}
                                  >
                                    编辑
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteArticle(article.id)}
                                    style={{
                                      padding: '0.5rem 1rem',
                                      border: '1px solid #dc3545',
                                      background: 'white',
                                      color: '#dc3545',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      fontSize: '0.8rem'
                                    }}
                                  >
                                    删除
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* 分页组件 */}
                        {totalPages > 1 && (
                          <div style={{ marginTop: '2rem' }}>
                            <Pagination 
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
                              totalItems={totalItems}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* 快速开始 */
              <div>
                <h3 style={{ 
                  color: '#333', 
                  marginBottom: '1rem', 
                  borderBottom: '2px solid #667eea', 
                  paddingBottom: '0.5rem' 
                }}>
                  快速开始
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  欢迎使用创作者中心！您可以在这里管理您的博客内容、创建新文章、查看数据统计等。
                  点击左侧的"写文章"按钮开始您的创作之旅。
                </p>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div style={{ 
                    padding: '1rem', 
                    background: '#e7f3ff', 
                    borderRadius: '6px',
                    border: '1px solid #b3d9ff'
                  }}>
                    <h4 style={{ color: '#0066cc', marginBottom: '0.5rem' }}>📝 写文章</h4>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      创建新的博客文章，分享您的知识和经验
                    </p>
                  </div>
                  <div style={{ 
                    padding: '1rem', 
                    background: '#fff3cd', 
                    borderRadius: '6px',
                    border: '1px solid #ffeaa7'
                  }}>
                    <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>📊 管理内容</h4>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      查看和管理您已发布的文章和草稿
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 创建/编辑文章模态框 */}
      {activeView === VIEWS.CREATE && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ color: '#333', margin: 0 }}>
                {editingArticle ? '编辑文章' : '创建新文章'}
              </h2>
              <button 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={editingArticle ? handleUpdateArticle : handleCreateArticle}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#333'
                }}>
                  文章标题
                </label>
                <input
                  type="text"
                  name="title"
                  value={articleForm.title}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                  placeholder="请输入文章标题"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#333'
                }}>
                  分类
                </label>
                <select
                  name="category"
                  value={articleForm.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">请选择分类</option>
                  <option value="技术">技术</option>
                  <option value="生活">生活</option>
                  <option value="读书">读书</option>
                  <option value="旅行">旅行</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#333'
                }}>
                  标签
                </label>
                <input
                  type="text"
                  name="tags"
                  value={articleForm.tags}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                  placeholder="请输入标签，用逗号分隔"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#333'
                }}>
                  文章内容
                </label>
                <textarea
                  name="content"
                  value={articleForm.content}
                  onChange={handleInputChange}
                  required
                  rows="10"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="请输入文章内容..."
                />
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'flex-end'
              }}>
                <button 
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '1px solid #ddd',
                    background: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  取消
                </button>
                <button 
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    background: '#667eea',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {editingArticle ? '更新文章' : '创建文章'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatorCenter
