package com.personal.portfolio.blog.infrastructure.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * OAuth2 认证失败处理器
 * 处理 GitHub 等 OAuth2 登录失败后的逻辑，记录详细的错误信息
 */
@Component
@Slf4j
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, 
                                      HttpServletResponse response, 
                                      AuthenticationException exception) throws IOException, ServletException {
        
        // 记录关键错误信息
        log.error("OAuth2 authentication failed for request: {} {} from {}", 
                 request.getMethod(), request.getRequestURL(), request.getRemoteAddr());
        
        // 记录异常信息
        log.error("Exception: {} - {}", exception.getClass().getSimpleName(), exception.getMessage());
        
        // 如果是 OAuth2 异常，记录错误代码
        if (exception instanceof OAuth2AuthenticationException) {
            OAuth2AuthenticationException oauth2Ex = (OAuth2AuthenticationException) exception;
            OAuth2Error error = oauth2Ex.getError();
            log.error("OAuth2 error code: {}", error.getErrorCode());
        }
        
        // 提取具体的错误信息
        String errorMessage = extractErrorMessage(exception);
        String errorDetails = extractErrorDetails(exception);
        
        // 重定向到前端错误页面，携带错误信息
        try {
            String redirectUrl = String.format(
                "http://localhost:3001/login?error=true&message=%s&details=%s",
                URLEncoder.encode(errorMessage, StandardCharsets.UTF_8.name()),
                URLEncoder.encode(errorDetails, StandardCharsets.UTF_8.name())
            );
            
            response.sendRedirect(redirectUrl);
        } catch (Exception e) {
            log.error("Failed to redirect: {}", e.getMessage());
            // 备用重定向方案
            response.sendRedirect("http://localhost:3001/login?error=true");
        }
    }
    
    private String extractErrorMessage(AuthenticationException exception) {
        if (exception instanceof OAuth2AuthenticationException) {
            OAuth2AuthenticationException oauth2Ex = (OAuth2AuthenticationException) exception;
            OAuth2Error error = oauth2Ex.getError();
            
            // 根据错误代码提供友好的错误信息
            String errorCode = error.getErrorCode();
            switch (errorCode) {
                case "invalid_client":
                    return "GitHub OAuth2 客户端配置错误（Client ID 或 Client Secret 无效）";
                case "invalid_request":
                    return "无效的 OAuth2 请求";
                case "unauthorized_client":
                    return "客户端未授权使用此授权类型";
                case "access_denied":
                    return "用户拒绝了授权请求";
                case "unsupported_response_type":
                    return "不支持的响应类型";
                case "invalid_scope":
                    return "请求的范围无效或未知";
                case "server_error":
                    return "GitHub 服务器错误";
                case "temporarily_unavailable":
                    return "GitHub 服务暂时不可用";
                case "redirect_uri_mismatch":
                    return "回调 URL 不匹配，请检查 GitHub 应用配置";
                default:
                    return "OAuth2 错误: " + errorCode;
            }
        }
        
        // 其他类型的异常
        return exception.getMessage() != null ? 
               exception.getMessage() : "未知的认证错误";
    }
    
    private String extractErrorDetails(AuthenticationException exception) {
        StringBuilder details = new StringBuilder();
        
        details.append("异常类型: ").append(exception.getClass().getName()).append("\n");
        details.append("异常消息: ").append(exception.getMessage()).append("\n");
        
        if (exception instanceof OAuth2AuthenticationException) {
            OAuth2AuthenticationException oauth2Ex = (OAuth2AuthenticationException) exception;
            OAuth2Error error = oauth2Ex.getError();
            details.append("OAuth2 错误代码: ").append(error.getErrorCode()).append("\n");
            details.append("OAuth2 错误描述: ").append(error.getDescription()).append("\n");
            if (error.getUri() != null) {
                details.append("OAuth2 错误 URI: ").append(error.getUri()).append("\n");
            }
        }
        
        // 添加时间戳
        details.append("发生时间: ").append(java.time.LocalDateTime.now()).append("\n");
        
        return details.toString();
    }
}
