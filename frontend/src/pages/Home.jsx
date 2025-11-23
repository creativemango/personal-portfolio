import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ user }) => {
  return (
    <div className="page">
      <div className="container">
        <div className="welcome-section">
          <h1>欢迎来到个人作品集</h1>
          <p>这里是我分享技术、生活和思考的地方</p>
          
          {user ? (
            <div>
              <p>欢迎回来，{user.name || user.login}！</p>
              <Link to="/home" className="btn">
                进入博客主页
              </Link>
            </div>
          ) : (
            <div>
              <p>请登录以访问完整功能</p>
              <Link to="/login" className="btn">
                使用 GitHub 登录
              </Link>
            </div>
          )}
        </div>

        <div className="card">
          <h2>关于本站</h2>
          <p>
            这是一个个人技术博客和作品集网站，主要分享编程技术、项目经验和生活感悟。
            本站使用 Spring Boot 后端和 React 前端构建，支持 GitHub OAuth2 登录。
          </p>
        </div>

        <div className="card">
          <h2>主要功能</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              ✅ GitHub OAuth2 登录
            </li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              ✅ 响应式设计
            </li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              ✅ 博客文章管理
            </li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              ✅ 用户信息展示
            </li>
            <li style={{ padding: '0.5rem 0' }}>
              ✅ RESTful API
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>技术栈</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
              <h3 style={{ color: '#667eea' }}>前端</h3>
              <p>React + Vite</p>
              <p>React Router</p>
              <p>Axios</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
              <h3 style={{ color: '#667eea' }}>后端</h3>
              <p>Spring Boot</p>
              <p>Spring Security</p>
              <p>Spring Data JPA</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
              <h3 style={{ color: '#667eea' }}>数据库</h3>
              <p>H2 Database</p>
              <p>JPA/Hibernate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
