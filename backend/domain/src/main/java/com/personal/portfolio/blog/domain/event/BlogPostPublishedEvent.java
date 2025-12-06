package com.personal.portfolio.blog.domain.event;

import java.time.LocalDateTime;

/**
 * 博客文章发布领域事件
 * 当博客文章被发布时触发
 */
public class BlogPostPublishedEvent {
    
    private final Long blogPostId;
    private final String title;
    private final Long authorId;
    private final LocalDateTime publishedAt;
    
    public BlogPostPublishedEvent(Long blogPostId, String title, Long authorId, LocalDateTime publishedAt) {
        this.blogPostId = blogPostId;
        this.title = title;
        this.authorId = authorId;
        this.publishedAt = publishedAt;
    }
    
    public Long getBlogPostId() {
        return blogPostId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public Long getAuthorId() {
        return authorId;
    }
    
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }
    
    @Override
    public String toString() {
        return "BlogPostPublishedEvent{" +
                "blogPostId=" + blogPostId +
                ", title='" + title + '\'' +
                ", authorId=" + authorId +
                ", publishedAt=" + publishedAt +
                '}';
    }
}
