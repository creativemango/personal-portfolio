package com.personal.portfolio.blog.interfaces.dto.request;

import lombok.Data;

/**
 * 注册请求DTO
 */
@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
}
