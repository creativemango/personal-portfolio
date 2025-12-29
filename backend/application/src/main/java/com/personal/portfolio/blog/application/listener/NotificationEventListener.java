package com.personal.portfolio.blog.application.listener;

import com.personal.portfolio.blog.domain.event.CommentCreatedEvent;
import com.personal.portfolio.blog.domain.model.BlogPost;
import com.personal.portfolio.blog.domain.model.Comment;
import com.personal.portfolio.blog.domain.model.Notification;
import com.personal.portfolio.blog.domain.model.NotificationType;
import com.personal.portfolio.blog.domain.repository.BlogPostRepository;
import com.personal.portfolio.blog.domain.repository.CommentRepository;
import com.personal.portfolio.blog.domain.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationEventListener {

    private final NotificationRepository notificationRepository;
    private final BlogPostRepository blogPostRepository;
    private final CommentRepository commentRepository;

    @EventListener
    @Async // Run in background to not block the response
    @Transactional
    public void handleCommentCreated(CommentCreatedEvent event) {
        log.info("Processing CommentCreatedEvent: {}", event);

        try {
            if (event.parentId() != null) {
                handleReply(event);
            } else {
                handlePostComment(event);
            }
        } catch (Exception e) {
            log.error("Failed to create notification for comment: {}", event.commentId(), e);
        }
    }

    private void handleReply(CommentCreatedEvent event) {
        Comment parentComment = commentRepository.findById(event.parentId())
                .orElse(null);

        if (parentComment == null) {
            log.warn("Parent comment {} not found", event.parentId());
            return;
        }

        Long recipientId = parentComment.getUserId();

        // Don't notify if replying to self
        if (recipientId.equals(event.authorId())) {
            return;
        }

        String summary = truncate(event.content(), 50);
        createNotification(
                recipientId,
                NotificationType.REPLY_TO_COMMENT,
                "Someone replied to your comment: \"" + summary + "\"",
                event
        );
    }

    private void handlePostComment(CommentCreatedEvent event) {
        BlogPost post = blogPostRepository.findById(event.postId())
                .orElse(null);

        if (post == null) {
            log.warn("Post {} not found", event.postId());
            return;
        }

        Long recipientId = post.getAuthorId();

        // Don't notify if commenting on own post
        if (recipientId.equals(event.authorId())) {
            return;
        }

        String summary = truncate(event.content(), 50);
        createNotification(
                recipientId,
                NotificationType.COMMENT_ON_POST,
                "Someone commented on your post \"" + post.getTitle() + "\": \"" + summary + "\"",
                event
        );
    }

    private String truncate(String content, int length) {
        if (content == null) return "";
        if (content.length() <= length) return content;
        return content.substring(0, length) + "...";
    }

    private void createNotification(Long recipientId, NotificationType type, String content, CommentCreatedEvent event) {
        Notification notification = new Notification();
        notification.setRecipientId(recipientId);
        notification.setSenderId(event.authorId());
        notification.setType(type);
        notification.setContent(content);
        notification.setRelatedPostId(event.postId());
        notification.setRelatedCommentId(event.commentId());
        notification.setRead(false);
        
        notificationRepository.save(notification);
        log.info("Notification created for user {}", recipientId);
    }
}
