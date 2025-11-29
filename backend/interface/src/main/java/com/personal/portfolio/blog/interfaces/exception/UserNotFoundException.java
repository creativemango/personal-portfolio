package com.personal.portfolio.blog.interfaces.exception;

/**
 * 用户不存在异常
 */
public class UserNotFoundException extends AuthenticationException {
    
    public UserNotFoundException() {
        super("用户不存在");
    }
    
    public UserNotFoundException(String message) {
        super(message);
    }
}
