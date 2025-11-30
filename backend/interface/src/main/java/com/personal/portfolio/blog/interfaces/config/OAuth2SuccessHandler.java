package com.personal.portfolio.blog.interfaces.config;

import com.personal.portfolio.blog.interfaces.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Collections;

/**
 * OAuth2 登录成功处理器
 * 处理 GitHub 等 OAuth2 登录成功后的逻辑
 */
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, 
                                      Authentication authentication) throws IOException, ServletException {
        
        System.out.println("OAuth2 Success Handler called");
        System.out.println("Authentication principal type: " + authentication.getPrincipal().getClass().getName());
        
        try {
            if (authentication.getPrincipal() instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                
                System.out.println("OAuth2 User attributes: " + oauth2User.getAttributes());
                
                // 从 OAuth2 用户信息中提取必要字段
                String username = oauth2User.getAttribute("login");
                String name = oauth2User.getAttribute("name");
                String email = oauth2User.getAttribute("email");
                String avatarUrl = oauth2User.getAttribute("avatar_url");
                
                System.out.println("Extracted user info - username: " + username + ", name: " + name + ", email: " + email);
                
                // 使用 GitHub ID 作为用户ID，如果没有则使用 username 的哈希值
                Long userId = null;
                Object idAttribute = oauth2User.getAttribute("id");
                if (idAttribute instanceof Integer) {
                    userId = ((Integer) idAttribute).longValue();
                } else if (idAttribute instanceof Long) {
                    userId = (Long) idAttribute;
                } else if (idAttribute != null) {
                    // 尝试转换为Long
                    try {
                        userId = Long.valueOf(idAttribute.toString());
                    } catch (NumberFormatException e) {
                        System.err.println("Failed to parse user ID: " + idAttribute);
                    }
                }
                
                if (userId == null) {
                    userId = (long) Math.abs(username.hashCode());
                }
                
                System.out.println("User ID: " + userId);
                
                // 生成 JWT Token
                String token = jwtUtil.generateToken(username, userId);
                System.out.println("Generated JWT Token: " + token);
                
                // 确保用户名不为空
                if (username == null || username.trim().isEmpty()) {
                    throw new IllegalArgumentException("GitHub用户名不能为空");
                }
                
                // 构建用户信息，确保所有字段都有值
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("id", userId != null ? userId : 0L);
                userInfo.put("username", username != null ? username : "github_user");
                userInfo.put("login", username != null ? username : "github_user");
                userInfo.put("name", name != null ? name : username);
                userInfo.put("email", email != null ? email : "");
                userInfo.put("avatar_url", avatarUrl != null ? avatarUrl : "");
                userInfo.put("displayName", name != null ? name : username);
                
                // 构建响应数据
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("success", true);
                responseData.put("message", "GitHub 登录成功");
                responseData.put("token", token);
                responseData.put("user", userInfo);
                
                System.out.println("Final user info: " + userInfo);
                
                // 重定向到前端 OAuth2 成功页面，携带 Token 和用户信息
                try {
                    String userInfoJson = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(userInfo);
                    String redirectUrl = String.format(
                        "http://localhost:3001/oauth2/success?token=%s&user=%s",
                        java.net.URLEncoder.encode(token, "UTF-8"),
                        java.net.URLEncoder.encode(userInfoJson, "UTF-8")
                    );
                    
                    System.out.println("Redirecting to: " + redirectUrl);
                    response.sendRedirect(redirectUrl);
                } catch (Exception jsonError) {
                    System.err.println("JSON encoding error: " + jsonError.getMessage());
                    // 使用更简单的重定向作为备用方案
                    String redirectUrl = String.format(
                        "http://localhost:3001/oauth2/success?token=%s",
                        java.net.URLEncoder.encode(token, "UTF-8")
                    );
                    response.sendRedirect(redirectUrl);
                }
            } else {
                // 如果不是 OAuth2 用户，重定向到主页
                System.out.println("Not an OAuth2 user, redirecting to home");
                response.sendRedirect("http://localhost:3001/home");
            }
        } catch (Exception e) {
            System.err.println("Error in OAuth2 success handler: " + e.getMessage());
            e.printStackTrace();
            // 发生错误时重定向到登录页面
            response.sendRedirect("http://localhost:3001/login?error=oauth2_failed");
        }
    }
}
