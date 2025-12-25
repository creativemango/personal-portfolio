package com.personal.portfolio.blog.infrastructure.filter;

import static com.personal.portfolio.blog.infrastructure.context.ContextConstants.USER_ID;
import static com.personal.portfolio.blog.infrastructure.context.ContextConstants.USERNAME;

import com.personal.portfolio.blog.infrastructure.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;

/**
 * JWT 认证过滤器
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        String requestUri = request.getRequestURI();
        String method = request.getMethod();
        
        log.debug("JWT Filter processing {} request to {}", method, requestUri);
        
        // 记录请求头信息（调试用）
        if (log.isDebugEnabled()) {
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                if (headerName.equalsIgnoreCase("authorization")) {
                    log.debug("Request header {}: {}", headerName, request.getHeader(headerName));
                }
            }
        }
        
        // 获取请求头中的 Token
        String token = jwtUtil.resolveToken(request);
        
        log.debug("Resolved token from request: {}", token != null ? "[PRESENT]" : "null");
        
        if (token != null) {
            log.debug("Token found, validating...");
            boolean isValid = jwtUtil.validateToken(token);
            log.debug("Token validation result: {}", isValid);
            
            if (isValid) {
                // Token 有效，设置认证信息
                String username = jwtUtil.getUsernameFromToken(token);
                Long userId = jwtUtil.getUserIdFromToken(token);
                
                log.debug("Token decoded - username: {}, userId: {}", username, userId);
                
                if (username != null && userId != null) {
                    // 创建认证令牌
                    String role = jwtUtil.getRoleFromToken(token);
                    String authority = "ROLE_VISITOR";
                    if (role != null) {
                        if ("ADMIN".equalsIgnoreCase(role)) {
                            authority = "ROLE_ADMIN";
                        } else {
                            authority = "ROLE_VISITOR";
                        }
                    }
                    UsernamePasswordAuthenticationToken authentication = 
                        new UsernamePasswordAuthenticationToken(
                            username, 
                            null, 
                            Collections.singletonList(new SimpleGrantedAuthority(authority))
                        );
                    
                    // 设置认证信息到 SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    
                    // 将用户ID设置到请求属性中，方便后续使用
                    request.setAttribute(USER_ID, userId);
                    request.setAttribute(USERNAME, username);
                    
                    log.debug("Authentication set for user: {}", username);
                } else {
                    log.warn("Token validation passed but could not extract username or userId");
                }
            } else {
                log.warn("Invalid JWT token received");
            }
        } else {
            log.debug("No JWT token found in request");
        }
        
        filterChain.doFilter(request, response);
    }

}
