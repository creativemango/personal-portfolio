package com.personal.portfolio.blog.interfaces.dto.response;

import com.personal.portfolio.blog.application.dto.CommentDTO;

import java.time.LocalDateTime;

import io.github.linpeilie.annotations.AutoMapper;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AutoMapper(target = CommentDTO.class)
public class CommentResponse {
    private Long id;
    private Long postId;
    private Long userId;
    private String authorName;
    private String content;
    private Long parentId;
    private LocalDateTime createdAt;
}
