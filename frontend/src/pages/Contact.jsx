import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加表单提交逻辑
    alert('感谢您的留言！我会尽快回复您。')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* 联系信息 */}
          <div className="card">
            <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>联系我</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
              如果您有任何问题或合作意向，欢迎与我联系！
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  📧
                </div>
                <div>
                  <h3 style={{ color: '#333', marginBottom: '0.25rem' }}>邮箱</h3>
                  <p style={{ color: '#666' }}>your.email@example.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  💼
                </div>
                <div>
                  <h3 style={{ color: '#333', marginBottom: '0.25rem' }}>GitHub</h3>
                  <p style={{ color: '#666' }}>
                    <a 
                      href="https://github.com/yourusername" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#667eea', textDecoration: 'none' }}
                    >
                      github.com/yourusername
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  💬
                </div>
                <div>
                  <h3 style={{ color: '#333', marginBottom: '0.25rem' }}>微信</h3>
                  <p style={{ color: '#666' }}>your-wechat-id</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  📍
                </div>
                <div>
                  <h3 style={{ color: '#333', marginBottom: '0.25rem' }}>位置</h3>
                  <p style={{ color: '#666' }}>中国 · 北京</p>
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: '#f8f9fa', 
              borderRadius: '8px' 
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>响应时间</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                我通常会在 24 小时内回复邮件。如果您有紧急事务，可以通过其他方式联系我。
              </p>
            </div>
          </div>

          {/* 联系表单 */}
          <div className="card">
            <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>发送消息</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label 
                  htmlFor="name" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#333',
                    fontWeight: '500'
                  }}
                >
                  姓名 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#333',
                    fontWeight: '500'
                  }}
                >
                  邮箱 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label 
                  htmlFor="subject" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#333',
                    fontWeight: '500'
                  }}
                >
                  主题 *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  htmlFor="message" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#333',
                    fontWeight: '500'
                  }}
                >
                  消息 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'border-color 0.3s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <button 
                type="submit" 
                className="btn"
                style={{ width: '100%' }}
              >
                发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
