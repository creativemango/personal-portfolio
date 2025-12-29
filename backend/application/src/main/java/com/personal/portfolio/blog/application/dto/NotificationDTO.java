package com.personal.portfolio.blog.application.dto;

import com.personal.portfolio.blog.domain.model.Notification;
import com.personal.portfolio.blog.domain.model.NotificationType;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AutoMapper(target = Notification.class)
public class NotificationDTO {
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
