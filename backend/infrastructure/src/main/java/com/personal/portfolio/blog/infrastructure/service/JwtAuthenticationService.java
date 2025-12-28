package com.personal.portfolio.blog.infrastructure.service;

import com.personal.portfolio.blog.domain.service.AuthenticationService;
import com.personal.portfolio.blog.infrastructure.util.JwtUtil;
import org.springframework.stereotype.Service;

/**
 * JWT认证服务实现 - 基础设施层
 */
@Service
public class JwtAuthenticationService implements AuthenticationService {
    
    private final JwtUtil jwtUtil;
    
    public JwtAuthenticationService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    
    @Override
    public String generateToken(String username, Long userId) {
        return jwtUtil.generateToken(username, userId);
    }
    
    @Override
    public String generateToken(String username, Long userId, String role) {
        return jwtUtil.generateToken(username, userId, role);
    }
    
    @Override
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }
    
    @Override
    public String getUsernameFromToken(String token) {
        return jwtUtil.getUsernameFromToken(token);
    }
    
    @Override
    public Long getUserIdFromToken(String token) {
        return jwtUtil.getUserIdFromToken(token);
    }

    @Override
    public String generateToken(String username, Long userId, String role, String avatarUrl) {
        return jwtUtil.generateToken(username, userId, role, avatarUrl);
    }
}
