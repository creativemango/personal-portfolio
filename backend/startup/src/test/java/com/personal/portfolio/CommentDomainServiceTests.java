package com.personal.portfolio;

import com.personal.portfolio.blog.domain.context.AdminPolicy;
import com.personal.portfolio.blog.domain.context.CurrentUserContext;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.model.Comment;
import com.personal.portfolio.blog.domain.service.CommentDomainService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class CommentDomainServiceTests {
    private final CommentDomainService service = new CommentDomainService();

    private static class StubUserCtx implements CurrentUserContext {
        private final Long id;
        private final String name;
        StubUserCtx(Long id, String name) { this.id = id; this.name = name; }
        public Long getCurrentUserId() { return id; }
        public String getCurrentUsername() { return name; }
        public boolean isAuthenticated() { return id != null; }
        public String getCurrentLanguage() { return null; }
        public String getCurrentHost() { return null; }
        public String getCurrentAvatarUrl() { return null; }
    }

    private static class StubAdminPolicy implements AdminPolicy {
        private final String adminName;
        StubAdminPolicy(String adminName) { this.adminName = adminName; }
        public boolean isAdminUsername(String username) { return adminName != null && adminName.equals(username); }
        public boolean isAdminGithubId(String githubId) { return false; }
    }

    @Test
    void createCommentFailsWhenUnauthenticated() {
        BlogPost post = new BlogPost();
        post.setId(1L);
        post.setIsPublished(true);
        Assertions.assertThrows(IllegalStateException.class, () ->
            service.composeNewComment(post, "hello", null, new StubUserCtx(null, null))
        );
    }

    @Test
    void createCommentFailsWhenUnpublished() {
        BlogPost post = new BlogPost();
        post.setId(1L);
        post.setIsPublished(false);
        Assertions.assertThrows(IllegalStateException.class, () ->
            service.composeNewComment(post, "hello", null, new StubUserCtx(2L, "u"))
        );
    }

    @Test
    void createCommentFailsWhenInvalidContent() {
        BlogPost post = new BlogPost();
        post.setId(1L);
        post.setIsPublished(true);
        Assertions.assertThrows(IllegalArgumentException.class, () ->
            service.composeNewComment(post, "   ", null, new StubUserCtx(2L, "u"))
        );
    }

    @Test
    void createCommentSucceedsAndNormalizesContent() {
        BlogPost post = new BlogPost();
        post.setId(10L);
        post.setIsPublished(true);
        Comment c = service.composeNewComment(post, "  abc  ", null, new StubUserCtx(3L, "alice"));
        Assertions.assertEquals(10L, c.getPostId());
        Assertions.assertEquals(3L, c.getUserId());
        Assertions.assertEquals("alice", c.getAuthorName());
        Assertions.assertEquals("abc", c.getContent());
    }

    @Test
    void assertCanDeleteAllowsAdmin() {
        Comment target = new Comment();
        target.setUserId(100L);
        service.assertCanDelete(target, new StubUserCtx(1L, "admin"), new StubAdminPolicy("admin"));
    }

    @Test
    void assertCanDeleteAllowsOwner() {
        Comment target = new Comment();
        target.setUserId(5L);
        service.assertCanDelete(target, new StubUserCtx(5L, "u5"), new StubAdminPolicy("admin"));
    }

    @Test
    void assertCanDeleteRejectsOthers() {
        Comment target = new Comment();
        target.setUserId(5L);
        Assertions.assertThrows(IllegalStateException.class, () ->
            service.assertCanDelete(target, new StubUserCtx(6L, "u6"), new StubAdminPolicy("admin"))
        );
    }
}
