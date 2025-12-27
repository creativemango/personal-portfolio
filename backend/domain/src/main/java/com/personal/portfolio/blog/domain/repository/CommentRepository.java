package com.personal.portfolio.blog.domain.repository;

import com.personal.portfolio.blog.domain.model.Comment;
import com.personal.portfolio.page.PageResult;

import java.util.Optional;

public interface CommentRepository {
    PageResult<Comment> listByPostId(Long postId, Integer page, Integer size);
    Comment save(Comment comment);
    Optional<Comment> findById(Long id);
    boolean deleteById(Long id);
    Long countByPostId(Long postId);
}
