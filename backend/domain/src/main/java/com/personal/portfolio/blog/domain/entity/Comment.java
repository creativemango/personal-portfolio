package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 评论实体类
 */
@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "is_approved", nullable = false)
    private Boolean isApproved = false;
    
    @Column(name = "like_count", nullable = false)
    private Integer likeCount = 0;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_post_id", nullable = false)
    private BlogPost blogPost;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;
    
    public Comment() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Comment(String content, User author, BlogPost blogPost) {
        this();
        this.content = content;
        this.author = author;
        this.blogPost = blogPost;
    }
    
    public Comment(String content, User author, BlogPost blogPost, Comment parentComment) {
        this(content, author, blogPost);
        this.parentComment = parentComment;
    }
    
    /**
     * 批准评论
     */
    public void approve() {
        this.isApproved = true;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 拒绝评论
     */
    public void reject() {
        this.isApproved = false;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 更新评论内容
     */
    public void updateContent(String content) {
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 增加点赞数
     */
    public void incrementLikeCount() {
        this.likeCount++;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 减少点赞数
     */
    public void decrementLikeCount() {
        if (this.likeCount > 0) {
            this.likeCount--;
            this.updatedAt = LocalDateTime.now();
        }
    }
    
    /**
     * 验证评论是否有效
     */
    public boolean isValid() {
        return content != null && !content.trim().isEmpty() &&
               author != null && blogPost != null;
    }
    
    /**
     * 检查是否为回复评论
     */
    public boolean isReply() {
        return parentComment != null;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
