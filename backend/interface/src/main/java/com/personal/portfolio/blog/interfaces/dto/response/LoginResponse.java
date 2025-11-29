package com.personal.portfolio.blog.interfaces.dto.response;

import lombok.Data;

/**
 * 登录响应DTO
 */
@Data
public class LoginResponse {
    private String message;
    private String token;
    private UserInfo user;
    
    /**
     * 用户信息DTO
     */
    @Data
    public static class UserInfo {
        private Long id;
        private String username;
        private String email;
        private String displayName;
    }
}
