package com.personal.portfolio.blog.application.event;

import java.time.LocalDateTime;

import lombok.Getter;

/**
 * 博客文章创建应用事件
 * 用于跨应用边界的通信
 */
@Getter
public class BlogPostCreatedAppEvent {
    
    private final Long blogPostId;
    private final String title;
    private final Long authorId;
    private final LocalDateTime createdAt;
    private final String eventType = "BLOG_POST_CREATED";
    
    public BlogPostCreatedAppEvent(Long blogPostId, String title, Long authorId, LocalDateTime createdAt) {
        this.blogPostId = blogPostId;
        this.title = title;
        this.authorId = authorId;
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "BlogPostCreatedApplicationEvent{" +
                "blogPostId=" + blogPostId +
                ", title='" + title + '\'' +
                ", authorId=" + authorId +
                ", createdAt=" + createdAt +
                ", eventType='" + eventType + '\'' +
                '}';
    }
}
