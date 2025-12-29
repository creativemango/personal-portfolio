package com.personal.portfolio.blog.domain.event;

import java.time.LocalDateTime;

public record CommentCreatedEvent(
    Long commentId,
    Long postId,
    Long authorId, // The user who commented
    String content,
    Long parentId, // If it's a reply
    LocalDateTime createdAt
) {}
