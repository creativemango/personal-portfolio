package com.personal.portfolio.blog.interfaces.controller;

import com.personal.portfolio.blog.application.dto.CommentDTO;
import com.personal.portfolio.blog.application.service.CommentAppService;
import com.personal.portfolio.blog.interfaces.dto.request.CreateCommentRequest;
import com.personal.portfolio.blog.interfaces.dto.response.CommentResponse;
import com.personal.portfolio.converter.PageResultConverter;
import com.personal.portfolio.page.PageResult;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import io.github.linpeilie.Converter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {
    private final CommentAppService commentService;
    private static final Converter converter = new Converter();
    private static final PageResultConverter pageResultConverter = new PageResultConverter();

    @GetMapping("/blog/posts/{postId}/comments")
    public PageResult<CommentResponse> listComments(@PathVariable Long postId, @RequestParam(defaultValue = "1") Integer page, @RequestParam(defaultValue = "20") Integer size) {
        PageResult<CommentDTO> result = commentService.listComments(postId, page, size);
        return pageResultConverter.convert(result, CommentResponse.class);
    }

    @PostMapping("/blog/posts/{postId}/comments")
    @PreAuthorize("isAuthenticated()")
    public CommentResponse createComment(@PathVariable Long postId, @Valid @RequestBody CreateCommentRequest request) {
        CommentDTO created = commentService.createComment(postId, request.getContent(), request.getParentId());
        return converter.convert(created, CommentResponse.class);
    }

    @DeleteMapping("/comments/{id}")
    @PreAuthorize("isAuthenticated()")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }

    @PostMapping("/comments/{id}/like")
    public void likeComment(@PathVariable Long id) {
        commentService.likeComment(id);
    }
}
