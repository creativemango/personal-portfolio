package com.personal.portfolio.blog.infrastructure.service;

import com.personal.portfolio.blog.domain.service.PasswordService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * BCrypt密码服务实现
 * 基础设施层实现domain层定义的PasswordService接口
 */
@Service
public class BCryptPasswordService implements PasswordService {
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String encode(String rawPassword) {
        if (rawPassword == null || rawPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("密码不能为空");
        }
        return passwordEncoder.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword == null) {
            return false;
        }
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @Override
    public boolean isValidStrength(String password) {
        if (password == null) {
            return false;
        }
        int length = password.length();
        return length >= 8 && length <= 16;
    }

    @Override
    public boolean isValidUsername(String username) {
        if (username == null || username.isEmpty()) {
            return false;
        }
        if (username.length() > 50) {
            return false;
        }
        // 只允许字母和数字
        return username.matches("^[a-zA-Z0-9]+$");
    }
}
