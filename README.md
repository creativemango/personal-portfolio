# Personal Portfolio - 个人博客网站

基于SpringBoot + Maven + DDD架构的个人博客网站项目。

## 项目架构

本项目采用多模块架构，包含后端模块，为后续添加前端模块预留空间。

### 模块结构

#### 1. 父项目 (personal-portfolio)
- **位置**: 根目录
- **描述**: Maven父项目，管理依赖和模块
- **包含模块**:
  - `backend` - 后端模块

#### 2. Backend (后端模块)
- **位置**: `backend/`
- **描述**: Maven父模块，包含DDD架构的4个子模块
- **包含子模块**:
  - `domain` - 领域层
  - `application` - 应用层
  - `infrastructure` - 基础设施层
  - `interface` - 接口层

### DDD分层架构 (在backend模块下)

#### Domain (领域层)
- **位置**: `backend/src/main/java/com/personal/portfolio/blog/domain/`
- **职责**: 包含核心业务逻辑和领域模型
- **特点**: 不依赖任何其他层，保持纯净
- **包含**:
  - 实体(Entity): `BlogPost`
  - 仓储接口(Repository): `BlogPostRepository`

#### Application (应用层)
- **位置**: `backend/src/main/java/com/personal/portfolio/blog/application/`
- **职责**: 协调领域对象和基础设施，实现用例
- **依赖**: Domain
- **包含**:
  - 应用服务(Service): `BlogPostService`

#### Infrastructure (基础设施层)
- **位置**: `backend/src/main/java/com/personal/portfolio/blog/infrastructure/`
- **职责**: 实现领域层定义的接口，提供技术实现
- **依赖**: Domain
- **特点**: 采用依赖倒置原则
- **包含**:
  - 仓储实现: `BlogPostRepositoryImpl`
  - 数据访问、外部服务等

#### Interface (接口层)
- **位置**: `backend/src/main/java/com/personal/portfolio/blog/interface/`
- **职责**: 处理HTTP请求和响应
- **依赖**: Application
- **包含**:
  - 控制器(Controller): `BlogPostController`
  - 异常处理: `GlobalExceptionHandler`
  - DTO对象

## 依赖关系

```
父项目
├── backend (后端模块)
    ├── interface → application → domain
    └── infrastructure → domain
```

**依赖倒置原则**: Domain层定义接口，Infrastructure层实现接口，确保Domain层不依赖具体实现。

## 技术栈

- **框架**: Spring Boot 3.2.0
- **构建工具**: Maven
- **Java版本**: 17
- **数据库**: H2 (内存数据库，开发环境)
- **依赖管理**: Lombok

## 快速开始

### 1. 环境要求
- Java 17+
- Maven 3.6+

### 2. 环境配置
确保正确设置JAVA_HOME环境变量指向JDK 17+：
```bash
# Windows PowerShell
$env:JAVA_HOME="C:\Program Files\Java\jdk-21"

# 或者永久设置系统环境变量
```

### 3. 构建项目
```bash
mvn clean compile
```

### 4. 运行项目
```bash
mvn spring-boot:run
```

### 4. 访问应用
- 应用地址: http://localhost:8080/api
- H2控制台: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - 用户名: `sa`
  - 密码: (空)

## API接口

### 博客文章管理

#### 创建博客文章
```http
POST /api/blog/posts
Content-Type: application/json

{
  "title": "我的第一篇博客",
  "content": "这是博客内容...",
  "author": "张三"
}
```

#### 获取所有博客文章
```http
GET /api/blog/posts
```

#### 获取已发布的博客文章
```http
GET /api/blog/posts/published
```

#### 根据ID获取博客文章
```http
GET /api/blog/posts/{id}
```

#### 发布博客文章
```http
PUT /api/blog/posts/{id}/publish
```

#### 更新博客文章
```http
PUT /api/blog/posts/{id}
Content-Type: application/json

{
  "title": "更新后的标题",
  "content": "更新后的内容"
}
```

#### 删除博客文章
```http
DELETE /api/blog/posts/{id}
```

## 项目特点

1. **多模块架构**: 后端模块独立，便于后续添加前端模块
2. **清晰的DDD分层**: 严格遵循DDD四层架构
3. **依赖倒置**: Domain层不依赖具体实现
4. **模块化设计**: 每个模块职责单一
5. **易于测试**: 各层之间松耦合，便于单元测试
6. **可扩展性**: 易于添加新功能和模块

## 开发规范

1. Domain层只包含业务逻辑，不包含技术细节
2. 所有外部依赖通过接口定义在Domain层
3. Infrastructure层实现Domain层定义的接口
4. Application层协调Domain对象和Infrastructure
5. Interface层处理HTTP请求和响应

## 后续扩展

- 添加前端模块 (React/Vue/Angular)
- 添加用户认证和授权
- 集成真实数据库(MySQL/PostgreSQL)
- 添加文件上传功能
- 实现博客分类和标签
- 添加评论功能
- 集成缓存(Redis)
- 添加搜索功能(Elasticsearch)
