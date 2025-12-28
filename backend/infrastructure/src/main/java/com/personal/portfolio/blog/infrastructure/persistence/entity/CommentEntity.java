package com.personal.portfolio.blog.infrastructure.persistence.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.personal.portfolio.blog.domain.model.Comment;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@TableName("comments")
@AutoMapper(target = Comment.class)
public class CommentEntity {
    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("blog_post_id")
    private Long postId;

    @TableField("user_id")
    private Long userId;

    @TableField("author_name")
    private String authorName;

    @TableField("content")
    private String content;

    @TableField("parent_id")
    private Long parentId;

    @TableField("like_count")
    private Integer likeCount;

    @TableField(value = "created_at", fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    @TableField(value = "updated_at", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;

    @TableField("is_approved")
    private Boolean isApproved;
}

