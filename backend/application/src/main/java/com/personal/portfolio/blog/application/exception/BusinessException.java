package com.personal.portfolio.blog.application.exception;

/**
 * 业务异常
 * 用于封装业务规则校验失败的情况
 */
public class BusinessException extends RuntimeException {
    
    public BusinessException(String message) {
        super(message);
    }
    
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
