package com.personal.portfolio.blog.interfaces.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * JWT 配置属性
 */
@Data
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
    
    /**
     * JWT 密钥
     */
    private String secret = "personal-portfolio-jwt-secret-key-2025";
    
    /**
     * Token 过期时间（分钟）
     */
    private Long expiration = 120L;
    
    /**
     * Token 前缀
     */
    private String tokenPrefix = "Bearer ";
    
    /**
     * Token 请求头名称
     */
    private String tokenHeader = "Authorization";
}
