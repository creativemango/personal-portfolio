package com.personal.portfolio.blog.application.exception;

public class AuthFailedException extends RuntimeException {
    public AuthFailedException() {
        super("Authentication failed");
    }
    public AuthFailedException(String message) {
        super(message);
    }
}

