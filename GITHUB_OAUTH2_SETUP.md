# GitHub OAuth2 登录集成指南

## 概述

本项目已成功集成了Spring Security OAuth2，支持通过GitHub账户登录。以下是完整的配置和使用说明。

## 已实现的功能

1. ✅ Spring Security OAuth2 依赖配置
2. ✅ GitHub OAuth2 应用配置
3. ✅ 安全配置类
4. ✅ 登录控制器
5. ✅ 用户实体扩展
6. ✅ 登录页面模板

## 配置步骤

### 1. 设置JAVA_HOME环境变量

由于Maven需要正确的JAVA_HOME环境变量，请按以下步骤设置：

**Windows:**
```cmd
# 设置JAVA_HOME环境变量
setx JAVA_HOME "C:\Program Files\Java\jdk-21"
# 重启命令行或重新加载环境变量
```

**验证设置:**
```cmd
echo %JAVA_HOME%
java -version
mvn -version
```

### 2. 配置GitHub OAuth2应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: Personal Portfolio
   - **Homepage URL**: http://localhost:8080
   - **Authorization callback URL**: http://localhost:8080/login/oauth2/code/github
4. 点击 "Register application"
5. 复制生成的 Client ID 和 Client Secret

**重要提示**: 回调URL必须是 `http://localhost:8080/login/oauth2/code/github`，这是Spring Security OAuth2的默认重定向URL。

### 3. 更新配置文件

在 `backend/interface/src/main/resources/application.properties` 中更新您的GitHub OAuth2凭据：

```properties
# Spring Security OAuth2 GitHub Configuration
spring.security.oauth2.client.registration.github.client-id=您的实际Client ID
spring.security.oauth2.client.registration.github.client-secret=您的实际Client Secret
spring.security.oauth2.client.registration.github.scope=user:email,read:user
spring.security.oauth2.client.registration.github.redirect-uri={baseUrl}/login/oauth2/code/{registrationId}
```

### 4. 运行应用程序

```bash
# 在项目根目录执行
mvn -f backend/interface/pom.xml spring-boot:run
```

或者：

```bash
# 先编译整个项目
mvn clean install
# 然后运行
mvn -f backend/interface/pom.xml spring-boot:run
```

## 使用说明

### 访问应用

1. 启动应用后，访问: http://localhost:8080/
2. 点击登录链接或直接访问: http://localhost:8080/login
3. 点击 "使用 GitHub 登录" 按钮
4. 授权应用访问您的GitHub账户
5. 登录成功后，您将被重定向到用户信息页面

### API端点

- `GET /` - 首页
- `GET /login` - 登录页面
- `GET /user/profile` - 获取当前用户信息（需要登录）
- `POST /logout` - 退出登录

### 获取用户信息

登录成功后，访问 `/user/profile` 将返回类似以下格式的用户信息：

```json
{
  "id": 12345678,
  "login": "your-github-username",
  "name": "Your Name",
  "email": "your-email@example.com",
  "avatar_url": "https://avatars.githubusercontent.com/u/12345678?v=4",
  "bio": "Your bio",
  "location": "Your location",
  "company": "Your company",
  "blog": "https://your-blog.com",
  "twitter_username": "your-twitter",
  "public_repos": 42,
  "followers": 100,
  "following": 50,
  "created_at": "2020-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## 技术实现细节

### 依赖项

- `spring-boot-starter-security` - Spring Security核心
- `spring-boot-starter-oauth2-client` - OAuth2客户端支持
- `spring-boot-starter-thymeleaf` - 模板引擎（用于登录页面）

### 安全配置

- 允许公开访问登录页面和OAuth2端点
- 配置GitHub OAuth2登录
- 禁用CSRF保护（开发环境）
- 允许H2控制台访问

### 用户实体扩展

User实体已扩展支持OAuth2：
- `githubId` - GitHub用户ID
- `githubUsername` - GitHub用户名
- `loginType` - 登录方式（LOCAL/GITHUB）

## 故障排除

### 常见问题

1. **JAVA_HOME未设置**
   - 解决方案：设置正确的JAVA_HOME环境变量

2. **GitHub OAuth2授权失败**
   - 检查Client ID和Client Secret是否正确
   - 验证回调URL是否与GitHub应用配置一致

3. **端口冲突**
   - 修改 `server.port` 配置使用其他端口

4. **依赖下载失败**
   - 检查网络连接
   - 尝试使用 `mvn clean install -U`

### 日志调试

启用调试日志：
```properties
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.security.oauth2=DEBUG
```

## 生产环境注意事项

1. **启用CSRF保护**
2. **使用HTTPS**
3. **配置数据库持久化**
4. **设置合适的会话超时**
5. **配置生产环境的GitHub OAuth2应用**

## 下一步开发建议

1. 实现用户注册和本地登录
2. 添加角色和权限管理
3. 实现用户信息持久化到数据库
4. 添加JWT令牌支持
5. 实现前端界面集成
