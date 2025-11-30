package com.personal.portfolio.blog.interfaces.dto.response;

import lombok.Data;

/**
 * 退出登录响应DTO
 */
@Data
public class LogoutResponse {
    private String redirectUrl;
}
