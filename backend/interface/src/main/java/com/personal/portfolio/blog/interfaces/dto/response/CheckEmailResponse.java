package com.personal.portfolio.blog.interfaces.dto.response;

import lombok.Data;

/**
 * 检查邮箱响应DTO
 */
@Data
public class CheckEmailResponse {
    private Boolean success;
    private Boolean available;
    private String message;
}
