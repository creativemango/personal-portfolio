import React from 'react'

const About = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>关于我</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
            欢迎来到我的个人作品集网站！这里是我分享技术、生活和思考的地方。
          </p>

          <div style={{ display: 'grid', gap: '2rem' }}>
            <section>
              <h2 style={{ color: '#333', marginBottom: '1rem' }}>个人简介</h2>
              <p style={{ lineHeight: '1.6', color: '#555' }}>
                我是一名热爱技术的开发者，专注于全栈开发和软件架构设计。
                喜欢探索新技术，解决复杂问题，并乐于分享知识和经验。
              </p>
            </section>

            <section>
              <h2 style={{ color: '#333', marginBottom: '1rem' }}>技术专长</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem' 
              }}>
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>后端开发</h3>
                  <ul style={{ color: '#555', lineHeight: '1.6' }}>
                    <li>Java / Spring Boot</li>
                    <li>微服务架构</li>
                    <li>RESTful API 设计</li>
                    <li>数据库设计</li>
                  </ul>
                </div>
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>前端开发</h3>
                  <ul style={{ color: '#555', lineHeight: '1.6' }}>
                    <li>React / Vue.js</li>
                    <li>TypeScript</li>
                    <li>响应式设计</li>
                    <li>性能优化</li>
                  </ul>
                </div>
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>DevOps</h3>
                  <ul style={{ color: '#555', lineHeight: '1.6' }}>
                    <li>Docker / Kubernetes</li>
                    <li>CI/CD 流水线</li>
                    <li>云服务部署</li>
                    <li>监控和日志</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ color: '#333', marginBottom: '1rem' }}>项目经验</h2>
              <div style={{ 
                display: 'grid', 
                gap: '1rem' 
              }}>
                <div style={{ 
                  padding: '1.5rem', 
                  background: '#f8f9fa', 
                  borderRadius: '8px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>
                    微服务电商平台
                  </h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    2023年 - 至今
                  </p>
                  <p style={{ color: '#555', lineHeight: '1.6' }}>
                    设计和开发基于微服务架构的电商平台，包含用户服务、商品服务、订单服务和支付服务等模块。
                    使用 Spring Cloud、Docker 和 Kubernetes 进行部署和管理。
                  </p>
                </div>
                <div style={{ 
                  padding: '1.5rem', 
                  background: '#f8f9fa', 
                  borderRadius: '8px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>
                    企业级内容管理系统
                  </h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    2022年 - 2023年
                  </p>
                  <p style={{ color: '#555', lineHeight: '1.6' }}>
                    开发企业级内容管理系统，支持多租户、权限管理和内容发布。
                    前端使用 React + TypeScript，后端使用 Spring Boot + MySQL。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ color: '#333', marginBottom: '1rem' }}>兴趣爱好</h2>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '1rem' 
              }}>
                <span style={{ 
                  background: '#e7f3ff', 
                  color: '#0066cc', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  技术博客写作
                </span>
                <span style={{ 
                  background: '#e7f3ff', 
                  color: '#0066cc', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  开源项目贡献
                </span>
                <span style={{ 
                  background: '#e7f3ff', 
                  color: '#0066cc', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  摄影
                </span>
                <span style={{ 
                  background: '#e7f3ff', 
                  color: '#0066cc', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  旅行
                </span>
                <span style={{ 
                  background: '#e7f3ff', 
                  color: '#0066cc', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  阅读
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
