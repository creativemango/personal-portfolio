package com.personal.portfolio.blog.domain.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 博客文章实体 - 领域模型的核心
 */
@Getter
@Setter
public class BlogPost {
    
    private UUID id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean published;
    
    public BlogPost(String title, String content, String author) {
        this.id = UUID.randomUUID();
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.published = false;
    }
    
    /**
     * 发布博客文章
     */
    public void publish() {
        this.published = true;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 取消发布博客文章
     */
    public void unpublish() {
        this.published = false;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 更新博客内容
     */
    public void updateContent(String title, String content) {
        this.title = title;
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }
    
    /**
     * 验证博客文章是否有效
     */
    public boolean isValid() {
        return title != null && !title.trim().isEmpty() &&
               content != null && !content.trim().isEmpty() &&
               author != null && !author.trim().isEmpty();
    }
}
