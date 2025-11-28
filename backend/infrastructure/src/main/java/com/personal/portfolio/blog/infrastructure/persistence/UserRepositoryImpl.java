package com.personal.portfolio.blog.infrastructure.persistence;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.personal.portfolio.blog.domain.entity.User;
import com.personal.portfolio.blog.domain.repository.UserRepository;
import com.personal.portfolio.blog.infrastructure.persistence.mapper.UserMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 用户仓储实现类 - 使用MyBatis Plus
 */
@Repository
public class UserRepositoryImpl implements UserRepository {
    
    private final UserMapper userMapper;
    
    public UserRepositoryImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    
    @Override
    public User save(User user) {
        if (user.getId() == null) {
            // 新增
            user.preUpdate();
            userMapper.insert(user);
        } else {
            // 更新
            user.preUpdate();
            userMapper.updateById(user);
        }
        return user;
    }
    
    @Override
    public Optional<User> findById(Long id) {
        User user = userMapper.selectById(id);
        return Optional.ofNullable(user);
    }
    
    @Override
    public Optional<User> findByGithubId(String githubId) {
        User user = userMapper.selectByGithubId(githubId);
        return Optional.ofNullable(user);
    }
    
    @Override
    public Optional<User> findByUsername(String username) {
        User user = userMapper.selectByUsername(username);
        return Optional.ofNullable(user);
    }
    
    @Override
    public Optional<User> findByEmail(String email) {
        User user = userMapper.selectByEmail(email);
        return Optional.ofNullable(user);
    }
    
    @Override
    public List<User> findAll() {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(User::getCreatedAt);
        return userMapper.selectList(queryWrapper);
    }
    
    @Override
    public void delete(Long id) {
        userMapper.deleteById(id);
    }
    
    @Override
    public boolean existsByUsername(String username) {
        int count = userMapper.countByUsername(username);
        return count > 0;
    }
    
    @Override
    public boolean existsByEmail(String email) {
        int count = userMapper.countByEmail(email);
        return count > 0;
    }
}
