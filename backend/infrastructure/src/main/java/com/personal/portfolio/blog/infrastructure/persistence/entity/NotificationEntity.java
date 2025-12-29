package com.personal.portfolio.blog.infrastructure.persistence.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.personal.portfolio.blog.domain.model.Notification;
import com.personal.portfolio.blog.domain.model.NotificationType;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@TableName("notifications")
@AutoMapper(target = Notification.class)
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
