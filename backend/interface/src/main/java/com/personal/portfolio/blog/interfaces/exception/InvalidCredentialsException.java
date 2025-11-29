package com.personal.portfolio.blog.interfaces.exception;

/**
 * 用户名或密码错误异常
 */
public class InvalidCredentialsException extends AuthenticationException {
    
    public InvalidCredentialsException() {
        super("用户名或密码错误");
    }
    
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
