package com.personal.portfolio.blog.infrastructure.persistence.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.personal.portfolio.blog.domain.model.User;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 用户持久化实体
 * 包含MyBatis Plus注解，专注于数据存储
 */
@Getter
@Setter
@TableName("users")
@AutoMapper(target = User.class)
public class UserEntity {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("github_id")
    private String githubId;
    
    @TableField("username")
    private String username;
    
    @TableField("email")
    private String email;
    
    @TableField("display_name")
    private String displayName;
    
    @TableField("avatar_url")
    private String avatarUrl;
    
    @TableField("bio")
    private String bio;
    
    @TableField("location")
    private String location;
    
    @TableField("company")
    private String company;
    
    @TableField("website")
    private String website;
    
    @TableField("twitter_username")
    private String twitterUsername;
    
    @TableField("public_repos")
    private Integer publicRepos = 0;
    
    @TableField("followers")
    private Integer followers = 0;
    
    @TableField("following")
    private Integer following = 0;
    
    @TableField("password")
    private String password;
    
    @TableField("is_local_account")
    private Boolean isLocalAccount = true;

    @TableField(value = "created_at", fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    @TableField(value = "updated_at", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
    
    /**
     * 默认构造函数
     */
    public UserEntity() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
