package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户实体类
 */
@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    
    /**
     * 用户ID，主键，自增
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * 用户名，唯一，必填，最大长度50字符
     */
    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;
    
    /**
     * 邮箱地址，唯一，必填，最大长度100字符
     */
    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;
    
    /**
     * 密码，必填，最大长度255字符
     */
    @Column(name = "password", nullable = false, length = 255)
    private String password;
    
    /**
     * 显示名称，可选，最大长度100字符
     */
    @Column(name = "display_name", length = 100)
    private String displayName;
    
    /**
     * 头像URL，可选，最大长度255字符
     */
    @Column(name = "avatar_url", length = 255)
    private String avatarUrl;
    
    /**
     * 个人简介，可选，最大长度500字符
     */
    @Column(name = "bio", length = 500)
    private String bio;
    
    /**
     * GitHub用户ID，可选
     */
    @Column(name = "github_id")
    private Long githubId;

    /**
     * GitHub用户名，可选
     */
    @Column(name = "github_username", length = 50)
    private String githubUsername;

    /**
     * 用户角色，必填，最大长度20字符，默认USER
     */
    @Column(name = "role", nullable = false, length = 20)
    private String role = "USER";

    /**
     * 是否激活，默认激活
     */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    /**
     * 登录方式：LOCAL, GITHUB
     */
    @Column(name = "login_type", nullable = false, length = 10)
    private String loginType = "LOCAL";
    
    /**
     * 创建时间，必填
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    /**
     * 更新时间，必填
     */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    /**
     * 博客文章列表，一对多关系
     */
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BlogPost> blogPosts = new ArrayList<>();
    
    /**
     * 评论列表，一对多关系
     */
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();
    
    public User() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public User(String username, String email, String password, String displayName) {
        this();
        this.username = username;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
    }
    
    /**
     * 更新用户信息
     */
    public void updateProfile(String displayName, String bio, String avatarUrl) {
        this.displayName = displayName;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 验证用户信息是否有效
     */
    public boolean isValid() {
        return username != null && !username.trim().isEmpty() &&
               email != null && !email.trim().isEmpty() &&
               password != null && !password.trim().isEmpty();
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
