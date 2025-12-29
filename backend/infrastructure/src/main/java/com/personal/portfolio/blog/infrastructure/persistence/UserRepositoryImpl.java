package com.personal.portfolio.blog.infrastructure.persistence;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.personal.portfolio.blog.domain.model.User;
import com.personal.portfolio.blog.domain.model.UserRole;
import com.personal.portfolio.blog.domain.repository.UserRepository;
import com.personal.portfolio.blog.infrastructure.persistence.entity.UserEntity;
import com.personal.portfolio.blog.infrastructure.persistence.mapper.UserMapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import io.github.linpeilie.Converter;

/**
 * 用户仓储实现类 - 使用MyBatis Plus
 */
@Repository
public class UserRepositoryImpl implements UserRepository {
    
    private final UserMapper userMapper;

    private static final Converter converter = new Converter();

    public UserRepositoryImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    
    @Override
    public User save(User user) {
        UserEntity userEntity = converter.convert(user, UserEntity.class);
        // 显式映射角色以避免类型不匹配
        if (user.getRole() != null) {
            userEntity.setRole(user.getRole().name());
        } else if (userEntity.getRole() == null) {
            userEntity.setRole("VISITOR");
        }

        if (userEntity.getId() == null) {
            // 新增
            userEntity.setUpdatedAt(java.time.LocalDateTime.now());
            userMapper.insert(userEntity);
        } else {
            // 更新
            userEntity.setUpdatedAt(java.time.LocalDateTime.now());
            userMapper.updateById(userEntity);
        }
        // 更新ID（如果是新增）
        User saved = converter.convert(userEntity, User.class);
        if (userEntity.getRole() != null) {
            try {
                saved.setRole(UserRole.valueOf(userEntity.getRole()));
            } catch (IllegalArgumentException ex) {
                saved.setRole(UserRole.VISITOR);
            }
        }
        return saved;
    }
    
    @Override
    public Optional<User> findById(Long id) {
        UserEntity userEntity = userMapper.selectById(id);
        return Optional.ofNullable(userEntity).map(entity -> {
            User u = converter.convert(entity, User.class);
            if (entity.getRole() != null) {
                try {
                    u.setRole(UserRole.valueOf(entity.getRole()));
                } catch (IllegalArgumentException ex) {
                    u.setRole(UserRole.VISITOR);
                }
            }
            return u;
        });
    }
    
    @Override
    public Optional<User> findByGithubId(String githubId) {
        UserEntity userEntity = userMapper.selectByGithubId(githubId);
        return Optional.ofNullable(userEntity).map(entity -> {
            User u = converter.convert(entity, User.class);
            if (entity.getRole() != null) {
                try {
                    u.setRole(UserRole.valueOf(entity.getRole()));
                } catch (IllegalArgumentException ex) {
                    u.setRole(UserRole.VISITOR);
                }
            }
            return u;
        });
    }
    
    @Override
    public Optional<User> findByUsername(String username) {
        UserEntity userEntity = userMapper.selectByUsername(username);
        return Optional.ofNullable(userEntity).map(entity -> {
            User u = converter.convert(entity, User.class);
            if (entity.getRole() != null) {
                try {
                    u.setRole(UserRole.valueOf(entity.getRole()));
                } catch (IllegalArgumentException ex) {
                    u.setRole(UserRole.VISITOR);
                }
            }
            return u;
        });
    }
    
    @Override
    public Optional<User> findByEmail(String email) {
        UserEntity userEntity = userMapper.selectByEmail(email);
        return Optional.ofNullable(userEntity).map(entity -> {
            User u = converter.convert(entity, User.class);
            if (entity.getRole() != null) {
                try {
                    u.setRole(UserRole.valueOf(entity.getRole()));
                } catch (IllegalArgumentException ex) {
                    u.setRole(UserRole.VISITOR);
                }
            }
            return u;
        });
    }
    
    @Override
    public List<User> findAll() {
        LambdaQueryWrapper<UserEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(UserEntity::getCreatedAt);
        List<UserEntity> entities = userMapper.selectList(queryWrapper);
        return entities.stream()
                .map(entity -> {
                    User u = converter.convert(entity, User.class);
                    if (entity.getRole() != null) {
                        try {
                            u.setRole(UserRole.valueOf(entity.getRole()));
                        } catch (IllegalArgumentException ex) {
                            u.setRole(UserRole.VISITOR);
                        }
                    }
                    return u;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<User> findAllById(Iterable<Long> ids) {
        List<UserEntity> entities = userMapper.selectBatchIds((java.util.Collection<Long>) ids);
        return entities.stream()
                .map(entity -> {
                    User u = converter.convert(entity, User.class);
                    if (entity.getRole() != null) {
                        try {
                            u.setRole(UserRole.valueOf(entity.getRole()));
                        } catch (IllegalArgumentException ex) {
                            u.setRole(UserRole.VISITOR);
                        }
                    }
                    return u;
                })
                .collect(Collectors.toList());
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
