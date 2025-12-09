package com.personal.portfolio.blog.domain.service;

/**
 * 密码服务接口
 * 定义密码相关的业务操作，不包含具体实现
 * 遵循依赖倒置原则：domain层定义接口，infrastructure层实现
 */
public interface PasswordService {
    
    /**
     * 加密密码
     * @param rawPassword 原始密码
     * @return 加密后的密码
     */
    String encode(String rawPassword);
    
    /**
     * 验证密码
     * @param rawPassword 原始密码
     * @param encodedPassword 加密后的密码
     * @return 是否匹配
     */
    boolean matches(String rawPassword, String encodedPassword);
    
    /**
     * 验证密码强度
     * @param password 密码
     * @return 是否满足要求（8-16位）
     */
    boolean isValidStrength(String password);
    
    /**
     * 验证用户名格式
     * @param username 用户名
     * @return 是否满足要求（50位以内，只包含字母和数字）
     */
    boolean isValidUsername(String username);
}
