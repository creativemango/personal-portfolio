# GitHub OAuth2 故障排除指南

## 问题描述
GitHub OAuth2 回调一直处于 pending 状态：
```
http://localhost:8080/login/oauth2/code/github?code=9f9e1a6ae9915df6066b&state=xEbaRfcoRluNo_DcAI6KjMS7S_hjILCB7JwmAZ-H39s%3D
```

## 可能的原因和解决方案

### 1. GitHub 应用回调 URL 配置错误

#### 检查 GitHub OAuth App 配置
1. 访问 GitHub Settings → Developer settings → OAuth Apps
2. 找到您的应用
3. 检查 **Authorization callback URL** 配置

#### 正确的回调 URL 配置
对于本地开发环境，回调 URL 应该配置为：
```
http://localhost:8080/login/oauth2/code/github
```

#### 配置步骤
1. 登录 GitHub
2. 进入 Settings → Developer settings → OAuth Apps
3. 点击您的应用
4. 在 "Authorization callback URL" 字段中输入：
   ```
   http://localhost:8080/login/oauth2/code/github
   ```
5. 点击 "Update application"

### 2. 网络或代理问题

#### 检查网络连接
确保您的开发环境可以访问 GitHub API：
```bash
# 测试 GitHub API 连接
curl -I https://api.github.com

# 测试 GitHub OAuth 端点
curl -I https://github.com/login/oauth/authorize
```

#### 检查防火墙和代理
- 确保端口 8080 没有被防火墙阻止
- 如果使用代理，确保代理配置正确

### 3. 后端配置问题

#### 检查 application.properties
确保以下配置正确：
```properties
# GitHub OAuth2 配置
spring.security.oauth2.client.registration.github.client-id=您的client-id
spring.security.oauth2.client.registration.github.client-secret=您的client-secret
spring.security.oauth2.client.registration.github.scope=user:email,read:user

# OAuth2 Provider 配置
spring.security.oauth2.client.provider.github.authorization-uri=https://github.com/login/oauth/authorize
spring.security.oauth2.client.provider.github.token-uri=https://github.com/login/oauth/access_token
spring.security.oauth2.client.provider.github.user-info-uri=https://api.github.com/user
spring.security.oauth2.client.provider.github.user-name-attribute=login
```

### 4. 安全配置问题

#### 检查 SecurityConfig
确保 OAuth2 登录配置正确：
```java
.oauth2Login(oauth2 -> oauth2
    .loginPage("/login")
    .defaultSuccessUrl("http://localhost:3001/home", true)
    .failureUrl("http://localhost:3001/login?error=true")
)
```

### 5. 调试步骤

#### 启用详细日志
在 `application.properties` 中添加：
```properties
# 启用 Spring Security 调试日志
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.security.oauth2=DEBUG

# 启用 HTTP 请求日志
logging.level.org.apache.http=DEBUG
```

#### 检查后端日志
重启后端服务，查看控制台输出：
```bash
mvn -f backend/interface/pom.xml spring-boot:run
```

在日志中查找：
- OAuth2 授权请求
- 令牌交换过程
- 用户信息获取
- 任何错误信息

### 6. 常见错误

#### 错误：Invalid redirect_uri
```
error=redirect_uri_mismatch&error_description=The+redirect_uri+MUST+match+the+registered+callback+URL+for+this+application.
```
**解决方案**：确保 GitHub 应用的回调 URL 配置为 `http://localhost:8080/login/oauth2/code/github`

#### 错误：Bad credentials
```
error=bad_verification_code&error_description=The+code+passed+is+incorrect+or+expired.
```
**解决方案**：重新启动登录流程，确保使用新的授权码

#### 错误：Rate limit exceeded
```
error=rate_limit_exceeded
```
**解决方案**：等待一段时间后重试，或检查 GitHub API 速率限制

### 7. 测试流程

#### 步骤 1：验证 GitHub 应用配置
1. 确认 client-id 和 client-secret 正确
2. 确认回调 URL 配置正确
3. 确认应用状态为 "Active"

#### 步骤 2：验证后端配置
1. 重启后端服务
2. 检查启动日志是否有错误
3. 访问 `http://localhost:8080/login` 确认登录页面正常

#### 步骤 3：测试登录流程
1. 访问前端 `http://localhost:3001/login`
2. 点击 "使用 GitHub 登录"
3. 观察重定向到 GitHub 授权页面
4. 授权后观察回调过程

### 8. 替代方案

如果 GitHub OAuth2 仍然有问题，可以考虑：

#### 使用环境变量
```properties
spring.security.oauth2.client.registration.github.client-id=${GITHUB_CLIENT_ID}
spring.security.oauth2.client.registration.github.client-secret=${GITHUB_CLIENT_SECRET}
```

#### 使用不同的 OAuth2 提供商
- Google OAuth2
- Facebook OAuth2
- 其他支持的提供商

## 联系支持

如果以上步骤都无法解决问题，请提供：
1. 后端启动日志
2. 浏览器网络面板截图
3. GitHub 应用配置截图
4. 具体的错误信息

这样可以帮助进一步诊断问题。
