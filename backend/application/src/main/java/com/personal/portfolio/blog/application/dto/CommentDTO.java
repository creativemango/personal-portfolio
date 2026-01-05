package com.personal.portfolio.blog.application.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private Long postId;
    private Long userId;
    private String authorName;
    private String content;
    private Long parentId;
    private Integer likeCount;
    private String avatarUrl;
    private Boolean isLiked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
