package com.personal.portfolio.blog.domain.service;

/**
 * 认证服务接口 - 领域层定义
 * 用于处理用户认证相关操作，遵循依赖倒置原则
 */
public interface AuthenticationService {
    
    /**
     * 生成用户认证token
     * @param username 用户名
     * @param userId 用户ID
     * @return JWT token
     */
    String generateToken(String username, Long userId);
    
    /**
     * 验证token是否有效
     * @param token JWT token
     * @return 是否有效
     */
    boolean validateToken(String token);
    
    /**
     * 从token中获取用户名
     * @param token JWT token
     * @return 用户名
     */
    String getUsernameFromToken(String token);
    
    /**
     * 从token中获取用户ID
     * @param token JWT token
     * @return 用户ID
     */
    Long getUserIdFromToken(String token);
}
