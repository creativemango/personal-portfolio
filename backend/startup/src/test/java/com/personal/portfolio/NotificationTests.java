package com.personal.portfolio;

import com.personal.portfolio.blog.application.listener.NotificationEventListener;
import com.personal.portfolio.blog.domain.event.CommentCreatedEvent;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.model.Comment;
import com.personal.portfolio.blog.domain.model.Notification;
import com.personal.portfolio.blog.domain.model.NotificationType;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.domain.repository.CommentRepository;
import com.personal.portfolio.blog.domain.repository.NotificationRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.awaitility.Awaitility.await;
import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class NotificationTests {

    @Autowired
    private NotificationEventListener notificationEventListener;

    @MockitoBean
    private NotificationRepository notificationRepository;
    @MockitoBean
    private BlogPostRepository blogPostRepository;
    @MockitoBean
    private CommentRepository commentRepository;

    @Test
    void shouldNotifyPostAuthorWhenCommentOnPost() {
        // Given
        Long postId = 1L;
        Long postAuthorId = 100L;
        Long commenterId = 200L;

        BlogPost post = new BlogPost();
        post.setId(postId);
        post.setAuthorId(postAuthorId);
        post.setTitle("Test Post");

        when(blogPostRepository.findById(postId)).thenReturn(Optional.of(post));

        CommentCreatedEvent event = new CommentCreatedEvent(
                10L, postId, commenterId, "Nice post!", null, LocalDateTime.now()
        );

        // When
        notificationEventListener.handleCommentCreated(event);

        // Then
        await().atMost(2, SECONDS).untilAsserted(() -> {
            ArgumentCaptor<Notification> captor = ArgumentCaptor.forClass(Notification.class);
            verify(notificationRepository).save(captor.capture());
            Notification notification = captor.getValue();

            assertEquals(postAuthorId, notification.getRecipientId());
            assertEquals(NotificationType.COMMENT_ON_POST, notification.getType());
            assertEquals(postId, notification.getRelatedPostId());
        });
    }

    @Test
    void shouldNotNotifyIfAuthorCommentsOnOwnPost() {
        // Given
        Long postId = 1L;
        Long postAuthorId = 100L;
        Long commenterId = 100L; // Same as author

        BlogPost post = new BlogPost();
        post.setId(postId);
        post.setAuthorId(postAuthorId);

        when(blogPostRepository.findById(postId)).thenReturn(Optional.of(post));

        CommentCreatedEvent event = new CommentCreatedEvent(
                10L, postId, commenterId, "My own comment", null, LocalDateTime.now()
        );

        // When
        notificationEventListener.handleCommentCreated(event);

        // Then
        verify(notificationRepository, never()).save(any());
    }

    @Test
    void shouldNotifyParentCommentAuthorWhenReplying() {
        // Given
        Long postId = 1L;
        Long parentCommentId = 10L;
        Long parentAuthorId = 300L;
        Long replierId = 400L;

        Comment parentComment = new Comment();
        parentComment.setId(parentCommentId);
        parentComment.setUserId(parentAuthorId);
        parentComment.setPostId(postId);

        when(commentRepository.findById(parentCommentId)).thenReturn(Optional.of(parentComment));

        CommentCreatedEvent event = new CommentCreatedEvent(
                20L, postId, replierId, "Reply to you", parentCommentId, LocalDateTime.now()
        );

        // When
        notificationEventListener.handleCommentCreated(event);

        // Then
        await().atMost(2, SECONDS).untilAsserted(() -> {
            ArgumentCaptor<Notification> captor = ArgumentCaptor.forClass(Notification.class);
            verify(notificationRepository).save(captor.capture());
            Notification notification = captor.getValue();

            assertEquals(parentAuthorId, notification.getRecipientId());
            assertEquals(NotificationType.REPLY_TO_COMMENT, notification.getType());
            assertEquals(postId, notification.getRelatedPostId());
            assertEquals(20L, notification.getRelatedCommentId());
        });
    }
}
