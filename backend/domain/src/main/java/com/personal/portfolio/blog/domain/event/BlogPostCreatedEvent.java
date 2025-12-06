package com.personal.portfolio.blog.domain.event;

import java.time.LocalDateTime;

/**
 * 博客文章创建领域事件
 * 当博客文章被创建时触发
 */
public record BlogPostCreatedEvent(Long blogPostId, String title, Long authorId,
                                   LocalDateTime createdAt) {

    @Override
    public String toString() {
        return "BlogPostCreatedEvent{" +
                "blogPostId=" + blogPostId +
                ", title='" + title + '\'' +
                ", authorId=" + authorId +
                ", createdAt=" + createdAt +
                '}';
    }
}
