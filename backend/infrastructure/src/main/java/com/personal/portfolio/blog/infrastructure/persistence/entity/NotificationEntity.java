package com.personal.portfolio.blog.infrastructure.persistence.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.personal.portfolio.blog.domain.model.NotificationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@TableName("notifications")
public class NotificationEntity {
    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("recipient_id")
    private Long recipientId;

    @TableField("type")
    private NotificationType type;

    @TableField("content")
    private String content;

    @TableField("related_post_id")
    private Long relatedPostId;

    @TableField("related_comment_id")
    private Long relatedCommentId;

    @TableField("sender_id")
    private Long senderId;

    @TableField("is_read")
    private boolean read;

    @TableField(value = "created_at", fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
}
