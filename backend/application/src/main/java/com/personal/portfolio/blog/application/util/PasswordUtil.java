package com.personal.portfolio.blog.application.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * 密码工具类
 * 用于密码加密和验证
 */
public class PasswordUtil {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * 加密密码
     * @param rawPassword 原始密码
     * @return 加密后的密码
     */
    public static String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    /**
     * 验证密码
     * @param rawPassword 原始密码
     * @param encodedPassword 加密后的密码
     * @return 是否匹配
     */
    public static boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    /**
     * 验证密码强度
     * @param password 密码
     * @return 是否满足要求（8-16位）
     */
    public static boolean isValidPassword(String password) {
        if (password == null) {
            return false;
        }
        int length = password.length();
        return length >= 8 && length <= 16;
    }

    /**
     * 验证用户名格式
     * @param username 用户名
     * @return 是否满足要求（50位以内，只包含字母和数字）
     */
    public static boolean isValidUsername(String username) {
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
