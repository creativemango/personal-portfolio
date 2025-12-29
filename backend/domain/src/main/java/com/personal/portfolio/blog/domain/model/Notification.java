package com.personal.portfolio.blog.domain.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Notification {
    private Long id;
    private Long recipientId;
    private NotificationType type;
    private String content;
    private Long relatedPostId;
    private Long relatedCommentId;
    private Long senderId;
    private boolean isRead;
    private LocalDateTime createdAt;
    
    public void markAsRead() {
        this.isRead = true;
    }
}
