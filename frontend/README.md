# 个人作品集 - 前端项目

这是一个基于 React + Vite 构建的个人作品集前端项目，与 Spring Boot 后端通过 REST API 交互。

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **路由**: React Router DOM
- **HTTP客户端**: Axios
- **样式**: CSS3 + 响应式设计

## 项目结构

```
frontend/
├── src/
│   ├── components/          # 可复用组件
│   │   └── Navbar.jsx      # 导航栏组件
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx        # 首页
│   │   ├── Login.jsx       # 登录页面
│   │   ├── BlogHome.jsx    # 博客主页
│   │   ├── About.jsx       # 关于页面
│   │   └── Contact.jsx     # 联系页面
│   ├── services/           # API服务
│   │   └── authService.js  # 认证相关API
│   ├── App.jsx            # 主应用组件
│   ├── App.css            # 应用样式
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式
├── index.html             # HTML模板
├── vite.config.js         # Vite配置
└── package.json           # 项目配置
```

## 功能特性

### 1. 用户认证
- GitHub OAuth2 登录
- 自动检查登录状态
- 安全的退出登录

### 2. 页面功能
- **首页**: 项目介绍和技术栈展示
- **登录页面**: GitHub OAuth2 登录
- **博客主页**: 用户信息展示和博客文章
- **关于页面**: 个人简介和项目经验
- **联系页面**: 联系信息和留言表单

### 3. 用户体验
- 响应式设计，支持移动端
- 现代化的UI设计
- 流畅的页面切换
- 加载状态和错误处理

## 安装和运行

### 前置要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖
```bash
cd frontend
npm install
```

### 开发模式运行
```bash
npm run dev
```
应用将在 http://localhost:3000 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## API 接口

前端通过以下接口与后端交互：

### 认证相关
- `GET /api/user/profile` - 获取当前用户信息
- `GET /api/oauth2/authorization/github` - GitHub OAuth2 登录
- `POST /api/logout` - 退出登录

### 博客相关
- `GET /api/blog/posts` - 获取博客文章列表
- `GET /api/blog/posts/{id}` - 获取单个博客文章

## 配置说明

### Vite 配置
在 `vite.config.js` 中配置了开发服务器代理，将 `/api` 请求代理到后端服务：

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

### 环境要求
- 后端服务运行在 http://localhost:8080
- 前端服务运行在 http://localhost:3000

## 开发说明

### 添加新页面
1. 在 `src/pages/` 目录创建新的页面组件
2. 在 `App.jsx` 中添加路由配置
3. 在导航栏中添加对应的链接

### 添加API接口
1. 在 `src/services/` 目录创建或修改服务文件
2. 使用 axios 实例发送请求
3. 在组件中调用服务方法

### 样式开发
- 使用 CSS 模块化设计
- 支持响应式布局
- 统一的颜色和字体规范

## 部署

### 构建静态文件
```bash
npm run build
```

### 部署到静态服务器
将 `dist` 目录中的文件部署到任何静态文件服务器（如 Nginx、Apache 等）

### 与后端集成
确保后端 API 地址正确配置，可以通过环境变量或构建时配置。

## 故障排除

### 常见问题

1. **端口冲突**
   - 修改 `vite.config.js` 中的 `server.port` 配置

2. **API 请求失败**
   - 检查后端服务是否运行在 http://localhost:8080
   - 检查代理配置是否正确

3. **依赖安装失败**
   - 清除 node_modules 重新安装
   - 使用 `npm cache clean --force`

## 许可证

MIT License
