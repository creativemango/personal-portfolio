import React from 'react'

const BlogHome = ({ user }) => {
  // 示例博客文章数据
  const blogPosts = [
    {
      id: 1,
      title: 'Spring Boot 集成 GitHub OAuth2 登录',
      date: '2024年1月15日',
      category: '技术',
      readTime: '5分钟阅读',
      excerpt: '本文详细介绍了如何在Spring Boot应用中集成GitHub OAuth2登录功能，包括配置GitHub应用、设置Spring Security和创建用户界面。'
    },
    {
      id: 2,
      title: '微服务架构设计与实践',
      date: '2024年1月10日',
      category: '架构',
      readTime: '8分钟阅读',
      excerpt: '探讨微服务架构的设计原则、最佳实践以及在实际项目中的应用经验，包括服务拆分、通信机制和监控策略。'
    },
    {
      id: 3,
      title: '前端性能优化指南',
      date: '2024年1月5日',
      category: '前端',
      readTime: '6分钟阅读',
      excerpt: '分享前端性能优化的实用技巧，包括代码分割、懒加载、缓存策略和渲染优化等，帮助提升用户体验。'
    }
  ]

  const categories = [
    { name: '技术', count: 12 },
    { name: '生活', count: 8 },
    { name: '读书', count: 5 },
    { name: '旅行', count: 3 }
  ]

  const tags = ['#SpringBoot', '#Java', '#微服务', '#前端', '#DevOps']

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
                src={user.avatar_url} 
                alt="用户头像" 
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '4px solid #667eea'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100/667eea/ffffff?text=U'
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

        {/* 博客内容区域 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* 文章列表 */}
          <div>
            <div className="card">
              <h2 style={{ 
                color: '#333', 
                marginBottom: '1.5rem', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem' 
              }}>
                最新文章
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
                    {post.date} • {post.category} • {post.readTime}
                  </div>
                  <p style={{ color: '#555', lineHeight: '1.6' }}>
                    {post.excerpt}
                  </p>
                </div>
              ))}
            </div>
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
