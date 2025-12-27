package com.personal.portfolio.blog.domain.service;

import com.personal.portfolio.blog.domain.context.AdminPolicy;
import com.personal.portfolio.blog.domain.context.CurrentUserContext;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.model.Comment;

import org.springframework.stereotype.Service;

@Service
public class CommentDomainService {
    public Comment composeNewComment(BlogPost post, String rawContent, CurrentUserContext currentUserContext) {
        if (currentUserContext == null || !currentUserContext.isAuthenticated()) {
            throw new IllegalStateException("Unauthenticated");
        }
        if (post == null) {
            throw new IllegalArgumentException("Post not found");
        }
        if (!post.isPublished()) {
            throw new IllegalStateException("Post not published");
        }
        if (!Comment.isValidContent(rawContent)) {
            throw new IllegalArgumentException("Invalid content");
        }
        Comment comment = new Comment();
        comment.setPostId(post.getId());
        comment.setUserId(currentUserContext.getCurrentUserId());
        comment.setAuthorName(currentUserContext.getCurrentUsername());
        comment.setContent(Comment.normalizeContent(rawContent));
        return comment;
    }

    public void assertCanDelete(Comment target, CurrentUserContext currentUserContext, AdminPolicy adminPolicy) {
        if (currentUserContext == null || !currentUserContext.isAuthenticated()) {
            throw new IllegalStateException("Unauthenticated");
        }
        if (target == null) {
            throw new IllegalArgumentException("Comment not found");
        }
        boolean isAdmin = adminPolicy != null && adminPolicy.isAdminUsername(currentUserContext.getCurrentUsername());
        if (!isAdmin && !target.ownedBy(currentUserContext.getCurrentUserId())) {
            throw new IllegalStateException("Forbidden");
        }
    }
}
