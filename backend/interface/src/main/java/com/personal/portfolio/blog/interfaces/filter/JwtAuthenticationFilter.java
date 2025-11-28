package com.personal.portfolio.blog.interfaces.filter;

import com.personal.portfolio.blog.interfaces.config.JwtProperties;
import com.personal.portfolio.blog.interfaces.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * JWT 认证过滤器
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final JwtProperties jwtProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        // 获取请求头中的 Token
        String token = resolveToken(request);
        
        if (token != null && jwtUtil.validateToken(token)) {
            // Token 有效，设置认证信息
            String username = jwtUtil.getUsernameFromToken(token);
            Long userId = jwtUtil.getUserIdFromToken(token);
            
            if (username != null && userId != null) {
                // 创建认证令牌
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(
                        username, 
                        null, 
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
                    );
                
                // 设置认证信息到 SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);
                
                // 将用户ID设置到请求属性中，方便后续使用
                request.setAttribute("userId", userId);
            }
        }
        
        filterChain.doFilter(request, response);
    }

    /**
     * 从请求头中解析 Token
     *
     * @param request HTTP 请求
     * @return Token 字符串
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(jwtProperties.getTokenHeader());
        if (bearerToken != null && bearerToken.startsWith(jwtProperties.getTokenPrefix())) {
            return bearerToken.substring(jwtProperties.getTokenPrefix().length());
        }
        return null;
    }
}
