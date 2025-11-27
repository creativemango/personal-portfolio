package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;
import com.baomidou.mybatisplus.annotation.*;

import java.time.LocalDateTime;

/**
 * 评论实体类
 */
@TableName("comments")
@Getter
@Setter
public class Comment {
    
    /**
     * 评论ID，主键，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 评论内容，必填，最大长度1000字符
     */
    private String content;
    
    /**
     * 评论者名称，必填，最大长度50字符
     */
    private String authorName;
    
    /**
     * 评论者邮箱，可选，最大长度100字符
     */
    private String authorEmail;
    
    /**
     * 评论者网站，可选，最大长度255字符
     */
    private String authorWebsite;
    
    /**
     * 是否已审核，默认未审核
     */
    private Boolean isApproved = false;
    
    /**
     * 创建时间，必填
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间，必填
     */
    private LocalDateTime updatedAt;
    
    /**
     * 博客文章ID，必填
     */
    private Long blogPostId;
    
    /**
     * 父评论ID，可选（用于回复评论）
     */
    private Long parentId;
    
    /**
     * 用户ID，可选（如果评论者是注册用户）
     */
    private Long userId;
    
    public Comment() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Comment(String content, String authorName, Long blogPostId) {
        this();
        this.content = content;
        this.authorName = authorName;
        this.blogPostId = blogPostId;
    }
    
    /**
     * 审核评论
     */
    public void approve() {
        this.isApproved = true;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 取消审核评论
     */
    public void unapprove() {
        this.isApproved = false;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 验证评论是否有效
     */
    public boolean isValid() {
        return content != null && !content.trim().isEmpty() &&
               authorName != null && !authorName.trim().isEmpty() &&
               blogPostId != null;
    }
    
    /**
     * 更新前自动设置更新时间
     */
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
