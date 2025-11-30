package com.personal.portfolio.blog.interfaces.dto.response;

import lombok.Data;

/**
 * 注册响应DTO
 */
@Data
public class RegisterResponse {
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
