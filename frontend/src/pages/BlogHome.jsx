import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { getPublishedBlogPosts } from '../services/blogService';

const BlogHome = ({ user }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');

  const categories = [
    { name: '技术', count: 12 },
    { name: '生活', count: 8 },
    { name: '读书', count: 5 },
    { name: '旅行', count: 3 }
  ];

  const tags = ['#SpringBoot', '#Java', '#微服务', '#前端', '#DevOps'];

  // 加载文章列表
  const loadBlogPosts = async (page = 1, searchKeyword = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getPublishedBlogPosts(page, pagination.size, searchKeyword);
      
      setBlogPosts(response.records || []);
      setPagination({
        page: response.page || 1,
        size: response.size || 10,
        total: response.total || 0,
        pages: response.pages || 0
      });
    } catch (err) {
      console.error('加载文章失败:', err);
      setError(err.message || '加载文章失败，请稍后重试');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadBlogPosts(1, keyword);
  }, []);

  // 处理分页变化
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      loadBlogPosts(newPage, keyword);
      window.scrollTo(0, 0); // 滚动到顶部
    }
  };

  // 处理搜索
  const handleSearch = (e) => {
    e.preventDefault();
    loadBlogPosts(1, keyword);
  };

  // 处理搜索输入变化
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 清除搜索
  const clearSearch = () => {
    setKeyword('');
    loadBlogPosts(1, '');
  };

  return (
    <div className="page">
      <div className="container">
        {/* 欢迎区域 */}
        <div className="welcome-section">
          <h1>欢迎来到我的博客！</h1>
          <p>这里是我分享技术、生活和思考的地方</p>
        </div>

        {/* 用户信息区域 */}
        {user && (
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
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '4px solid #667eea'
                }}
                onError={(e) => {
                  e.target.src = '/images/default-avatar.png'
                }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>
                  {user.name || user.login}
                </h2>
                {user.bio && (
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>{user.bio}</p>
                )}
                {user.location && (
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>{user.location}</p>
                )}
                {user.company && (
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    公司: {user.company}
                  </p>
                )}
                {user.blog && (
                  <p>
                    <a 
                      href={user.blog} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#667eea', textDecoration: 'none' }}
                    >
                      {user.blog}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                background: '#f8f9fa', 
                borderRadius: '8px' 
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#667eea' 
                }}>
                  {user.followers || 0}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>关注者</div>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                background: '#f8f9fa', 
                borderRadius: '8px' 
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#667eea' 
                }}>
                  {user.following || 0}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>关注中</div>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                background: '#f8f9fa', 
                borderRadius: '8px' 
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#667eea' 
                }}>
                  {user.public_repos || 0}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>公开仓库</div>
              </div>
            </div>
          </div>
        )}

        {/* 搜索区域 */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="搜索文章标题或内容..."
              value={keyword}
              onChange={handleKeywordChange}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <button type="submit" style={{
              padding: '0.75rem 1.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              搜索
            </button>
            {keyword && (
              <button type="button" onClick={clearSearch} style={{
                padding: '0.75rem 1.5rem',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                清除
              </button>
            )}
          </form>
        </div>

        {/* 博客内容区域 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* 文章列表 */}
          <div>
            {loading && (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p>正在加载文章...</p>
              </div>
            )}
            
            {error && (
              <div className="card" style={{ textAlign: 'center', padding: '2rem', color: '#dc3545' }}>
                <p>{error}</p>
              </div>
            )}
            
            {!loading && !error && blogPosts.length === 0 && (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p>暂无文章</p>
              </div>
            )}
            
            {!loading && !error && blogPosts.length > 0 && (
              <div>
                <div className="card">
                  <h2 style={{ 
                    color: '#333', 
                    marginBottom: '1.5rem', 
                    borderBottom: '2px solid #667eea', 
                    paddingBottom: '0.5rem' 
                  }}>
                    最新文章
                    {keyword && (
                      <span style={{ fontSize: '0.9rem', color: '#666', marginLeft: '1rem' }}>
                        (搜索: "{keyword}")
                      </span>
                    )}
                  </h2>
                  
                  {blogPosts.map((post) => (
                    <div 
                      key={post.id}
                      style={{
                        background: '#f8f9fa',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        borderLeft: '4px solid #667eea'
                      }}
                    >
                      <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>
                        {post.title}
                      </h3>
                      <div style={{ 
                        color: '#666', 
                        fontSize: '0.9rem', 
                        marginBottom: '1rem' 
                      }}>
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString('zh-CN') : ''} • 
                        {post.category || '未分类'} • 
                        {post.summary || '暂无摘要'}
                      </div>
                      <p style={{ color: '#555', lineHeight: '1.6' }}>
                        {post.summary || post.content?.substring(0, 200) + '...'}
                      </p>
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ 
                          background: '#667eea', 
                          color: 'white', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '3px',
                          fontSize: '0.8rem'
                        }}>
                          阅读更多
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 分页组件 */}
                {pagination.pages > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    totalItems={pagination.total}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div>
            <div className="card">
              <h3 style={{ 
                color: '#333', 
                marginBottom: '1rem', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem' 
              }}>
                分类
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {categories.map((category, index) => (
                  <li 
                    key={index}
                    style={{ 
                      padding: '0.5rem 0', 
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{category.name}</span>
                    <span style={{ color: '#667eea' }}>({category.count})</span>
                  </li>
                ))}
              </ul>

              <h3 style={{ 
                color: '#333', 
                marginBottom: '1rem', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem' 
              }}>
                热门标签
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    style={{
                      background: '#e9ecef',
                      color: '#495057',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '3px',
                      fontSize: '0.8rem'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 style={{ 
                color: '#333', 
                marginBottom: '1rem', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem' 
              }}>
                关于本站
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                这是一个个人技术博客，主要分享编程技术、项目经验和生活感悟。
                本站使用 React + Spring Boot 构建，支持 GitHub OAuth2 登录。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogHome
