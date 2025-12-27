package com.personal.portfolio.blog.application.service;

import com.personal.portfolio.blog.application.dto.CommentDTO;

import com.personal.portfolio.blog.domain.context.AdminPolicy;
import com.personal.portfolio.blog.domain.context.CurrentUserContext;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.model.Comment;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.domain.repository.CommentRepository;
import com.personal.portfolio.blog.domain.service.CommentDomainService;
import com.personal.portfolio.converter.PageResultConverter;
import com.personal.portfolio.page.PageResult;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.linpeilie.Converter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentAppService {
    private final CommentRepository commentRepository;
    private final BlogPostRepository blogPostRepository;
    private final CurrentUserContext currentUserContext;
    private final AdminPolicy adminPolicy;
    private final CommentDomainService commentDomainService;

    private static final Converter converter = new Converter();
    private static final PageResultConverter pageResultConverter = new PageResultConverter();

    public PageResult<CommentDTO> listComments(Long postId, Integer page, Integer size) {
        PageResult<Comment> commentPageResult = commentRepository.listByPostId(postId, page, size);
        return pageResultConverter.convert(commentPageResult, CommentDTO.class);
    }

    @Transactional
    public CommentDTO createComment(Long postId, String content) {
        BlogPost post = blogPostRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));
        Comment comment = commentDomainService.composeNewComment(post, content, currentUserContext);
        Comment saved = commentRepository.save(comment);
        Long count = commentRepository.countByPostId(postId);
        post.updateCommentCount(count.intValue());
        blogPostRepository.save(post);
        return converter.convert(saved, CommentDTO.class);
    }

    @Transactional
    public boolean deleteComment(Long commentId) {
        Comment target = commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        commentDomainService.assertCanDelete(target, currentUserContext, adminPolicy);
        boolean ok = commentRepository.deleteById(commentId);
        Long count = commentRepository.countByPostId(target.getPostId());
        blogPostRepository.findById(target.getPostId()).ifPresent(post -> {
            post.updateCommentCount(count.intValue());
            blogPostRepository.save(post);
        });
        return ok;
    }
}
