package com.personal.portfolio.blog.interfaces.dto.response;

import com.personal.portfolio.blog.domain.model.NotificationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationResponse {
    private Long id;
    private Long recipientId;
    private NotificationType type;
    private String content;
    private Long relatedPostId;
    private Long relatedCommentId;
    private Long senderId;
    private String senderName;
    private String senderAvatar;
    private boolean isRead;
    private LocalDateTime createdAt;
}
