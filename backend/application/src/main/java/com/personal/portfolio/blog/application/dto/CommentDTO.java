package com.personal.portfolio.blog.application.dto;

import com.personal.portfolio.blog.domain.model.Comment;

import java.time.LocalDateTime;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;

@Data
@AutoMapper(target = Comment.class)
public class CommentDTO {
    private Long id;
    private Long postId;
    private Long userId;
    private String authorName;
    private String content;
    private Long parentId;
    private Integer likeCount;
    private Boolean isLiked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
