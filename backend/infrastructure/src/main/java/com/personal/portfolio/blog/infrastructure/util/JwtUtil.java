package com.personal.portfolio.blog.infrastructure.util;

import com.personal.portfolio.blog.infrastructure.config.JwtProperties;

import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;
import cn.hutool.jwt.JWTValidator;
import cn.hutool.jwt.signers.JWTSigner;
import cn.hutool.jwt.signers.JWTSignerUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * JWT 工具类
 */
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperties jwtProperties;

    /**
     * 生成 JWT Token
     *
     * @param username 用户名
     * @param userId   用户ID
     * @return JWT Token
     */
    public String generateToken(String username, Long userId) {
        return generateToken(username, userId, null, null);
    }
    
    public String generateToken(String username, Long userId, String role) {
        return generateToken(username, userId, role, null);
    }

    /**
     * 生成携带角色和头像的 JWT Token
     */
    public String generateToken(String username, Long userId, String role, String avatarUrl) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("username", username);
        payload.put("userId", userId);
        payload.put("issuedAt", new Date());
        payload.put("expiresAt", new Date(System.currentTimeMillis() + jwtProperties.getExpiration() * 60 * 1000));
        if (role != null) {
            payload.put("role", role);
        }
        if (avatarUrl != null) {
            payload.put("avatarUrl", avatarUrl);
        }

        JWTSigner signer = JWTSignerUtil.hs256(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
        return JWTUtil.createToken(payload, signer);
    }

    /**
     * 验证 JWT Token
     *
     * @param token JWT Token
     * @return 是否有效
     */
    public boolean validateToken(String token) {
        try {
            JWTSigner signer = JWTSignerUtil.hs256(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
            JWT jwt = JWTUtil.parseToken(token);
            
            // 验证签名
            if (!jwt.setSigner(signer).verify()) {
                return false;
            }
            
            // 验证过期时间
            JWTValidator.of(jwt).validateDate();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 从 Token 中获取用户名
     *
     * @param token JWT Token
     * @return 用户名
     */
    public String getUsernameFromToken(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            return jwt.getPayload("username").toString();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 从 Token 中获取用户ID
     *
     * @param token JWT Token
     * @return 用户ID
     */
    public Long getUserIdFromToken(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            return Long.valueOf(jwt.getPayload("userId").toString());
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 从 Token 中获取角色
     */
    public String getRoleFromToken(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            Object r = jwt.getPayload("role");
            return r != null ? r.toString() : null;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 从 Token 中获取头像URL
     */
    public String getAvatarUrlFromToken(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            Object r = jwt.getPayload("avatarUrl");
            return r != null ? r.toString() : null;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 检查 Token 是否即将过期（在指定分钟内）
     *
     * @param token JWT Token
     * @param minutes 分钟数
     * @return 是否即将过期
     */
    public boolean isTokenExpiringSoon(String token, int minutes) {
        try {
            JWT jwt = JWTUtil.parseToken(token);
            Date expiresAt = (Date) jwt.getPayload("expiresAt");
            long timeUntilExpiry = expiresAt.getTime() - System.currentTimeMillis();
            return timeUntilExpiry <= minutes * 60 * 1000;
        } catch (Exception e) {
            return true;
        }
    }

    /**
     * 刷新 Token
     *
     * @param token 原 Token
     * @return 新 Token
     */
    public String refreshToken(String token) {
        try {
            String username = getUsernameFromToken(token);
            Long userId = getUserIdFromToken(token);
            String role = getRoleFromToken(token);
            if (username != null && userId != null) {
                return generateToken(username, userId, role);
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 从请求头中解析 Token
     *
     * @param request HTTP 请求
     * @return Token 字符串
     */
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(jwtProperties.getTokenHeader());
        if (bearerToken != null && bearerToken.startsWith(jwtProperties.getTokenPrefix())) {
            return bearerToken.substring(jwtProperties.getTokenPrefix().length());
        }
        return null;
    }
}
