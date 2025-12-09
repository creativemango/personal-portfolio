package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.domain.model.User;
import com.personal.portfolio.blog.domain.repository.UserRepository;
import com.personal.portfolio.blog.domain.service.PasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 用户注册服务 - 处理用户注册和本地账户认证
 */
@Service
@RequiredArgsConstructor
public class UserRegistrationService {
    
    private final UserRepository userRepository;
    private final PasswordService passwordService;
    
    /**
     * 注册新用户
     * @param username 用户名
     * @param password 密码
     * @param email 邮箱（可选）
     * @return 注册成功的用户
     */
    public User registerUser(String username, String password, String email) {
        // 验证用户名格式
        if (!passwordService.isValidUsername(username)) {
            throw new IllegalArgumentException("用户名格式无效：必须是50位以内的字母和数字组合");
        }
        
        // 验证密码强度
        if (!passwordService.isValidStrength(password)) {
            throw new IllegalArgumentException("密码格式无效：必须是8-16位");
        }
        
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("用户名已存在：" + username);
        }
        
        // 如果提供了邮箱，检查邮箱是否已存在
        if (email != null && !email.trim().isEmpty()) {
            if (userRepository.existsByEmail(email)) {
                throw new IllegalArgumentException("邮箱已存在：" + email);
            }
        }
        
        // 创建新用户 - 使用User实体的工厂方法
        User user = User.createLocalUser(username, email, passwordService.encode(password));
        
        return userRepository.save(user);
    }
    
    /**
     * 验证用户名和密码
     * @param username 用户名
     * @param password 密码
     * @return 验证成功的用户，如果验证失败返回null
     */
    public User authenticate(String username, String password) {
        // 查找用户
        User user = userRepository.findByUsername(username)
                .orElse(null);
        
        if (user == null) {
            return null;
        }
        
        // 检查是否为本地账户
        if (Boolean.FALSE.equals(user.getIsLocalAccount())) {
            return null;
        }
        
        if (user.getPassword() == null ||
            !passwordService.matches(password, user.getPassword())) {
            return null;
        }
        
        return user;
    }
    
    /**
     * 检查用户名是否可用
     * @param username 用户名
     * @return 是否可用
     */
    public boolean isUsernameAvailable(String username) {
        if (!passwordService.isValidUsername(username)) {
            return false;
        }
        return !userRepository.existsByUsername(username);
    }
    
    /**
     * 检查邮箱是否可用
     * @param email 邮箱
     * @return 是否可用
     */
    public boolean isEmailAvailable(String email) {
        if (email == null || email.trim().isEmpty()) {
            return true;
        }
        return !userRepository.existsByEmail(email);
    }
}
