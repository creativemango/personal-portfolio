package com.personal.portfolio.blog.domain.repository;

import com.personal.portfolio.blog.domain.model.Notification;
import com.personal.portfolio.page.PageResult;

import java.util.Optional;

public interface NotificationRepository {
    PageResult<Notification> listByRecipientId(Long recipientId, Integer page, Integer size);
    Notification save(Notification notification);
    Optional<Notification> findById(Long id);
    Long countUnreadByRecipientId(Long recipientId);
    void markAllAsRead(Long recipientId);
}
