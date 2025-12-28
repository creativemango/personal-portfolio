package com.personal.portfolio;

import com.personal.portfolio.blog.application.dto.CommentDTO;
import com.personal.portfolio.blog.application.service.CommentAppService;
import com.personal.portfolio.blog.domain.context.AdminPolicy;
import com.personal.portfolio.blog.domain.context.CurrentUserContext;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.model.Comment;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.domain.repository.CommentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Optional;

import static org.mockito.Mockito.*;

@SpringBootTest
class CommentAppServiceTests {
    @Autowired
    private CommentAppService appService;

    @MockitoBean
    private CommentRepository commentRepository;
    @MockitoBean
    private BlogPostRepository blogPostRepository;
    @MockitoBean
    private CurrentUserContext currentUserContext;
    @MockitoBean
    private AdminPolicy adminPolicy;

    @Test
    void createCommentOrchestratesRepositoriesAndUpdatesCount() {
        BlogPost post = new BlogPost();
        post.setId(10L);
        post.setIsPublished(true);
        when(blogPostRepository.findById(10L)).thenReturn(Optional.of(post));
        when(currentUserContext.isAuthenticated()).thenReturn(true);
        when(currentUserContext.getCurrentUserId()).thenReturn(7L);
        when(currentUserContext.getCurrentUsername()).thenReturn("bob");
        when(commentRepository.save(any())).thenAnswer(invocation -> {
            Comment c = invocation.getArgument(0);
            c.setId(99L);
            return c;
        });
        when(commentRepository.countByPostId(10L)).thenReturn(3L);

        CommentDTO saved = appService.createComment(10L, " hi ", null);
        Assertions.assertEquals(99L, saved.getId());
        Assertions.assertEquals("hi", saved.getContent());
        Assertions.assertEquals(7L, saved.getUserId());
        Assertions.assertEquals("bob", saved.getAuthorName());

        ArgumentCaptor<BlogPost> postCaptor = ArgumentCaptor.forClass(BlogPost.class);
        verify(blogPostRepository).save(postCaptor.capture());
        Assertions.assertEquals(3, postCaptor.getValue().getCommentCount());
    }

    @Test
    void deleteCommentOrchestratesRepositoriesAndUpdatesCount() {
        Comment target = new Comment();
        target.setId(5L);
        target.setUserId(7L);
        target.setPostId(10L);
        when(commentRepository.findById(5L)).thenReturn(Optional.of(target));
        when(currentUserContext.isAuthenticated()).thenReturn(true);
        when(currentUserContext.getCurrentUserId()).thenReturn(7L);
        when(currentUserContext.getCurrentUsername()).thenReturn("bob");
        when(adminPolicy.isAdminUsername("bob")).thenReturn(false);
        when(commentRepository.deleteById(5L)).thenReturn(true);
        when(commentRepository.countByPostId(10L)).thenReturn(1L);
        BlogPost post = new BlogPost();
        post.setId(10L);
        post.setIsPublished(true);
        when(blogPostRepository.findById(10L)).thenReturn(Optional.of(post));

        boolean ok = appService.deleteComment(5L);
        Assertions.assertTrue(ok);
        ArgumentCaptor<BlogPost> postCaptor = ArgumentCaptor.forClass(BlogPost.class);
        verify(blogPostRepository).save(postCaptor.capture());
        Assertions.assertEquals(1, postCaptor.getValue().getCommentCount());
    }
}
