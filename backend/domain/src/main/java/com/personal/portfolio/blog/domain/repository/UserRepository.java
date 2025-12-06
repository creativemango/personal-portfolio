package com.personal.portfolio.blog.domain.repository;

import com.personal.portfolio.blog.domain.model.User;

import java.util.List;
import java.util.Optional;

/**
 * 用户仓储接口 - 领域层定义，基础设施层实现
 * 采用依赖倒置原则
 */
public interface UserRepository {
    
    /**
     * 保存用户
     */
    User save(User user);
    
    /**
     * 根据ID查找用户
     */
    Optional<User> findById(Long id);
    
    /**
     * 根据GitHub ID查找用户
     */
    Optional<User> findByGithubId(String githubId);
    
    /**
     * 根据用户名查找用户
     */
    Optional<User> findByUsername(String username);
    
    /**
     * 根据邮箱查找用户
     */
    Optional<User> findByEmail(String email);
    
    /**
     * 查找所有用户
     */
    List<User> findAll();
    
    /**
     * 删除用户
     */
    void delete(Long id);
    
    /**
     * 检查用户名是否已存在
     */
    boolean existsByUsername(String username);
    
    /**
     * 检查邮箱是否已存在
     */
    boolean existsByEmail(String email);
}
