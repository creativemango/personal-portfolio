package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;
import com.baomidou.mybatisplus.annotation.*;

import java.time.LocalDateTime;

/**
 * 用户实体类
 */
@TableName("users")
@Getter
@Setter
public class User {
    
    /**
     * 用户ID，主键，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * GitHub用户ID
     */
    private String githubId;
    
    /**
     * 用户名，必填，最大长度50字符
     */
    private String username;
    
    /**
     * 邮箱地址，可选，最大长度100字符
     */
    private String email;
    
    /**
     * 显示名称，可选，最大长度100字符
     */
    private String displayName;
    
    /**
     * 头像URL，可选，最大长度255字符
     */
    private String avatarUrl;
    
    /**
     * 个人简介，可选，最大长度500字符
     */
    private String bio;
    
    /**
     * 位置信息，可选，最大长度100字符
     */
    private String location;
    
    /**
     * 公司信息，可选，最大长度100字符
     */
    private String company;
    
    /**
     * 个人网站，可选，最大长度255字符
     */
    private String website;
    
    /**
     * Twitter用户名，可选，最大长度50字符
     */
    private String twitterUsername;
    
    /**
     * 公开仓库数量
     */
    private Integer publicRepos = 0;
    
    /**
     * 粉丝数量
     */
    private Integer followers = 0;
    
    /**
     * 关注数量
     */
    private Integer following = 0;
    
    /**
     * 创建时间，必填
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间，必填
     */
    private LocalDateTime updatedAt;
    
    public User() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public User(String githubId, String username, String email) {
        this();
        this.githubId = githubId;
        this.username = username;
        this.email = email;
    }
    
    /**
     * 更新前自动设置更新时间
     */
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
